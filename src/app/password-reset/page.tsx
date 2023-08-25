import Form from "@/components/form";

const Page = async () => {
	return (
		<>
			<h1>Reset password</h1>
			<Form action="/api/password-reset" successMessage={""}>
				<label htmlFor="email">Email</label>
				<input name="email" id="email" />
				<br />
				<input type="submit" />
			</Form>
		</>
	);
};

export default Page;
