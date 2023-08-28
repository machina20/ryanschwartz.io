"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Success } from "@/components/ui/success";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const router = useRouter();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch("api/login", {
				method: "POST",
				body: JSON.stringify({
					email,
					password,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				//redirect to guestbook
				window.location.href = "/guestbook";
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
					Log In
				</Button>
			</div>
		</form>
	);
};
