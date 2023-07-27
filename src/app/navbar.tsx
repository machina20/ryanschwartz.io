import Link from "next/link";

export default async function Navbar() {
	"use client";
	return (
		<nav className="  flex text-[#707070] justify-between w-full text-xs bg-[#201F1F] ">
			<LinkItem name="RYAN SCHWARTZ"></LinkItem>

			<div className="space-x-4 ">
				<LinkItem name="About"></LinkItem>
				<LinkItem name="Projects"></LinkItem>
				<LinkItem name="Contact"></LinkItem>
			</div>
		</nav>
	);
}

interface LinkItemProps {
	name: string;
	link?: string;
}
function LinkItem({ name, link }: LinkItemProps) {
	return (
		<a href={link} className="lg:text-xl transition-colors hover:text-white">
			{name}
		</a>
	);
}
