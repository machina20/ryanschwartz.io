"use client";

import { auth } from "@/auth/lucia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GuestbookForm() {
	const [submitted, setSubmitted] = useState(false);
	const [comment, setComment] = useState("");
	const [error, setError] = useState("");

	const router = useRouter();
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch("api/guestbook", {
				method: "POST",
				body: JSON.stringify({
					comment,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				//trigger a revalidation to show the new comment at the top
				setSubmitted(true);
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
				<Label htmlFor="email">Leave a cute message</Label>
				<Input
					required
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
					id="comment"
					type="comment"
				/>
			</div>
			<Button>Submit</Button>
		</form>
	);
}
