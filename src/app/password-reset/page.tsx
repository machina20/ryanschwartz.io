import Link from "next/link";
import { PassResetForm } from "./form";
import { auth } from "@/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
	const authRequest = auth.handleRequest({
		request: null,
		cookies,
	});
	const session = await authRequest.validate();
	if (!session) redirect("/login");
	return (
		<div className="h-screen  w-screen flex justify-center items-center sm:bg-[#201F1F]">
			<div className="sm:shadow-xl px-8 py-8 sm:bg-white rounded-lg space-y-12">
				<h1>Get a reset password link</h1>
				<PassResetForm></PassResetForm>
			</div>
		</div>
	);
};

export default Page;
