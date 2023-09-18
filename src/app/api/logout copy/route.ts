// app/api/logout/route.ts
import { auth } from "../../../auth/lucia"
import { redirect } from "next/navigation";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  
	const authRequest = auth.handleRequest(request);
	const session = await authRequest.validate();

	if (!session) {
    
		return new Response(
			JSON.stringify({
				error: "No current session"
			}),
			{
				status: 400
			}
		);
	}
	try {

		await auth.invalidateSession(session.sessionId) //kills the session
    authRequest.setSession(null)
    
    return new Response(JSON.stringify({}),{status: 200})


	} catch {
		return new Response(
			JSON.stringify({
				error: "An unknown error occurred"
			}),
			{
				status: 500
			}
		);
	}
};