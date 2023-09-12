const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
		serverActions: true,
	},
};

module.exports = withContentlayer(nextConfig);
