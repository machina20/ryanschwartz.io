const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
		serverActions: true,
		mdxRs: true,
	},
};

const withMDX = require("@next/mdx")();
module.exports = withContentlayer(withMDX(nextConfig));
