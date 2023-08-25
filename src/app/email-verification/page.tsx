import { auth } from "@/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Form from "@/components/form";

const Page = async () => {
	const authRequest = auth.handleRequest({
		request: null,
		cookies,
	});
	const session = await authRequest.validate();
	if (!session) redirect("/login");
	if (session.user.emailVerified) redirect("/");
	return (
		<div className="flex justify-center flex-col items-center">
			<h1>Email verification</h1>
			<p>Your email verification link was sent to your inbox (i.e. console).</p>
			<h2>Resend verification link</h2>
			<Form
				action="/api/email-verification"
				successMessage="Your verification link was resent"
			>
				<input type="submit" value="Resend" />
			</Form>
		</div>
	);
};

export default Page;
