import Link from "next/link";
import * as React from "react";

interface EmailTemplateProps {
	url: string;
	type: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	url,
	type,
}) =>
	type === "verify" ? (
		<div className="flex justify-center flex-col items-center">
			<h1 className="text-3xl ">Verify your email.</h1>
			<div>
				Click <a href={url}>here</a>.
			</div>
		</div>
	) : (
		<div className="flex justify-center flex-col items-center">
			<h1 className="text-3xl ">Reset your password.</h1>
			<div>
				Click <a href={url}>here</a>.
			</div>
		</div>
	);
