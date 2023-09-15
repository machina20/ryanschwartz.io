// app/posts/[slug]/page.tsx
import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import Navbar from "@/app/navbar";
import { notFound } from "next/navigation";

export const generateStaticParams = async () =>
	allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
	const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
	if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
	return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
	const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

	if (!post) {
		throw new Error(`Post not found for slug: ${params.slug}`);
		notFound();
	}
	return (
		<body className="pt-8 flex-col h-full px-12 md:px-24 lg:px-48 lg:pt-12 bg-[#201F1F] items-center">
			<Navbar />

			<article className="mx-auto max-w-xl py-8 bg-[#201F1F] w-full h-screen text-white">
				<div className="mb-8 text-center">
					<time dateTime={post.date} className="mb-1 text-xs text-white">
						{format(parseISO(post.date), "LLLL d, yyyy")}
					</time>
					<h1 className="text-3xl font-bold">{post.title}</h1>
				</div>
				<div
					className="[&>*]:mb-3 [&>*:last-child]:mb-0"
					dangerouslySetInnerHTML={{ __html: post.body.html }}
				/>
			</article>
		</body>
	);
};

export default PostLayout;
