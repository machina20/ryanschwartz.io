import { withContentlayer } from "next-contentlayer";
import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["@prisma/client"],
		serverActions: true,
		mdxRs: true,
	},
};

export default withContentlayer(nextConfig);
