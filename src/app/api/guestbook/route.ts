// app/api/logout/route.ts
import { auth } from "@/auth/lucia";
import { prisma_client } from "@/lib/prisma";
import { redirect } from "next/navigation";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  
	const authRequest = auth.handleRequest(request);
	const session = await authRequest.validate();
	const id = session?.user.userId

	const req = await request.json()
	const comment = req.comment

	console.log("before 18")
	if (!session || !id || !comment) {
    
		return new Response(
			JSON.stringify({
				error: "No current session or no id or no content"
			}),
			{
				status: 400
			}
		);
	}
	try {

		//check to see if they have more than 7 posts

		
    const posts = await prisma_client.post.findMany({ //get the users tokens 
			where:{
				id: id
			}
		}) 
		console.log("38")
		if (posts && posts.length < 7) {
			console.log("less then 7 posts")
			await prisma_client.post.create(
				{data: {
					user: session.user.email,
					content: comment,
					id: id
				}
			})

			return new Response(JSON.stringify({}),{status: 200})
			
		}


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