"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { signIn } from "next-auth/react";
import { Alert } from "@/components/ui/alert";
import Credentials from "next-auth/providers/credentials";
import { Success } from "@/components/ui/success";

export const EmailVerForm = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch("api/email-verification", {
				method: "POST",
				body: JSON.stringify({
					email,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				//redirect to login
				setSuccess("Verification email sent.");
			} else {
				console.log(error);
				setError((await res.json()).error);
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};
	return (
		<form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
			<div className="grid w-full  items-center gap-1.5">
				<Label htmlFor="email">Email</Label>
				<Input
					required
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					id="email"
					type="email"
				/>
			</div>

			<div className="w-full">
				{error && <Alert>{error}</Alert>}
				{success && <Success>{success}</Success>}

				<Button className="w-full bg-[#201F1F] hover:bg-gray-600" size={"lg"}>
					Resend
				</Button>
			</div>
		</form>
	);
};
