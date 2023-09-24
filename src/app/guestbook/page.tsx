import { auth } from "@/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../navbar";
import { Button } from "@/components/ui/button";
import Signout from "./form";
import GuestbookForm from "./guestbookForm";

const Guestbook = async () => {
	const authRequest = auth.handleRequest({
		request: null,
		cookies,
	});

	const session = await authRequest.validate();
	const email = session?.user.email;

	console.log("session: ", session);

	if (!session) redirect("/login");
	if (!session.user.emailVerified) redirect("/email-verification");

	return (
		<body className="flex justify-center pt-8 flex-col h-full px-12 md:px-24 lg:px-48 lg:pt-12 bg-[#201F1F] items-center text-white">
			<Navbar />

			<div className="flex justify-center text-xl pt-16 flex-col items-center">
				This page is protected. You should only be seeing this if you have
				verified your email.
			</div>
			<div>Logged in as {email}</div>

			<Signout></Signout>
			<GuestbookForm></GuestbookForm>
		</body>
	);
};

export default Guestbook;
