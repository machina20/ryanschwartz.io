import { auth } from "@/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { EmailVerForm } from "./form";

const Page = async () => {
	const authRequest = auth.handleRequest({
		request: null,
		cookies,
	});
	const session = await authRequest.validate();
	if (!session) redirect("/login");
	if (session.user.emailVerified) redirect("/");
	return (
		<div className="h-screen  w-screen flex justify-center items-center sm:bg-[#201F1F]">
			<div className="sm:shadow-xl px-8 py-8 sm:bg-white rounded-lg space-y-12">
				<p>Your email verification link was sent to your inbox.</p>
				<h2>Didn&apos;t get it?</h2>
				<EmailVerForm></EmailVerForm>
			</div>
		</div>
	);
};

export default Page;
