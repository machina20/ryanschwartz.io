"use client";

import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="  flex text-[#707070] justify-between w-full text-xs bg-[#201F1F] ">
			<LinkItem name="RYAN SCHWARTZ" link="/"></LinkItem>

			<div className="space-x-4 ">
				<LinkItem name="Projects" link="/"></LinkItem>
				<LinkItem name="Contact" link="/"></LinkItem>
				<LinkItem name="Guestbook" link="/guestbook"></LinkItem>
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
		<Link
			href={`${link}`}
			className="lg:text-xl transition-colors hover:text-white"
		>
			{name}
		</Link>
	);
}
