"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { signIn } from "next-auth/react";
import { Alert } from "@/components/ui/alert";
import { Success } from "@/components/ui/success";

export const PassResetForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch("api/password-reset", {
				//this endpoint sends an email if you're logged in
				method: "POST",
				body: JSON.stringify({
					email,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				//by this point you should be directed to
				setSuccess("Password reset link sent.");
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
					Request Link
				</Button>
			</div>
		</form>
	);
};
