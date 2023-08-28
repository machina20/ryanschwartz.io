"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Signout() {
	const router = useRouter();
	async function logout() {
		try {
			const res = await fetch("api/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			window.location.href = "/";
		} catch (err: any) {
			console.log(err.message);
		}
	}

	return (
		<Button className="mt-4" onClick={logout}>
			Sign out
		</Button>
	);
}
