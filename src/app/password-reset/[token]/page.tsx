import { PassResetTokenForm } from "./form";
const Page = async ({
	params,
}: {
	params: {
		token: string;
	};
}) => {
	return (
		<div className="h-screen  w-screen flex justify-center items-center sm:bg-[#201F1F]">
			<div className="sm:shadow-xl px-8 py-8 sm:bg-white rounded-lg space-y-12">
				<p>Choose your new password.</p>
				<PassResetTokenForm token={params.token}></PassResetTokenForm>
			</div>
		</div>
	);
};

export default Page;
