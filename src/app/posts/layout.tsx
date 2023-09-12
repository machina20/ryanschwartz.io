export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-[#201F1F]">{children}</body>
		</html>
	);
}
