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

interface PassResetProps {
	token: string;
}

export const PassResetTokenForm = ({ token }: PassResetProps) => {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch(
				`https://ryanschwartz.io/api/password-reset/${token}`,
				{
					method: "POST",
					body: JSON.stringify({
						password,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (res.ok) {
				//redirect to login
				setSuccess("Successfully reset password");
				setError("");
			} else {
				console.log(error);
				setError((await res.json()).error);
				setSuccess("");
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};
	return (
		<form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
			<div className="grid w-full  items-center gap-1.5">
				<Label htmlFor="password">Password</Label>
				<Input
					required
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					id="password"
					type="password"
				/>
			</div>

			<div className="w-full">
				{error && <Alert>{error}</Alert>}
				{success && <Success>{success}</Success>}

				<Button className="w-full bg-[#201F1F] hover:bg-gray-600" size={"lg"}>
					Submit
				</Button>
			</div>
		</form>
	);
};
