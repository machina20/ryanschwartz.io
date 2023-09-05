// auth/lucia.ts
import { lucia } from "lucia";
import { nextjs } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import "lucia/polyfill/node";
import {prisma_client} from "@/lib/prisma"

const client = prisma_client //importing the client from lib/prisma.ts


// expect error
export const auth = lucia({

	adapter: prisma(client),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",  
  middleware: nextjs(),
  sessionCookie: {
    expires: false
  },
  getUserAttributes: (data) => {
		return {
			email: data.email,
			emailVerified: data.email_verified, // `Boolean(data.email_verified)` if stored as an integer

		}
  
  },
  // experimental
	experimental: {
		debugMode: false
	},
	
});

export type Auth = typeof auth;