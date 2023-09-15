import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Navbar from "./navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Ryan Schwartz",
	description: "Portfolio/Blog Site",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="pt-8 flex-col h-full px-12 md:px-24 lg:px-48 lg:pt-12 bg-[#201F1F] items-center">
				{children}
			</body>
		</html>
	);
}
