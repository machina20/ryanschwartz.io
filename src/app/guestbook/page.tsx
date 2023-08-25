import { auth } from "@/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Guestbook = async () => {
	const authRequest = auth.handleRequest({
		request: null,
		cookies,
	});
	const session = await authRequest.validate();
	if (!session) redirect("/login");
	if (!session.user.emailVerified) redirect("/email-verification");
	return (
		<div className="flex justify-center text-xl">
			This is a protected page. You should only be able to see this if you have
			verified your email.
		</div>
	);
};

export default Guestbook;
