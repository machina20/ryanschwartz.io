// app/api/password-reset/route.ts
import { auth } from "@/auth/lucia";
import { sendPasswordResetLink } from "@/auth/email";
import { generatePasswordResetToken } from "@/auth/token";
import { prisma_client } from "@/lib/prisma";
import type { NextRequest } from "next/server";


const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
	if (typeof maybeEmail !== "string") return false;
	if (maybeEmail.length > 255) return false;
	const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
	return emailRegexp.test(maybeEmail);
};

export const POST = async (request: NextRequest) => {
	const req = await request.json();
	const email = req.email
	// basic check
	if (!isValidEmail(email)) {
		return new Response(
			JSON.stringify({
				error: "Invalid email"
			}),
			{
				status: 400
			}
		);
	}
	try {


    
		const storedUser = await prisma_client.user.findUnique({
      where:{
        email: email.toLowerCase()
      }
    })

		if (!storedUser) {
			return new Response(
				JSON.stringify({
					error: "User does not exist"
				}),
				{
					status: 400
				}
			);
		}
		const user = auth.transformDatabaseUser(storedUser);
		const token = await generatePasswordResetToken(user.userId);
		await sendPasswordResetLink(email, token);
		return new Response();
	} catch (e) {
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