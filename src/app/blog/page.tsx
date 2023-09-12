// app/page.tsx
import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import Navbar from "../navbar";

function PostCard(post: Post) {
	return (
		<div className="mb-8">
			<h2 className="mb-1 text-xl">
				<Link href={post.url} className="text-white hover:text-[#707070] ">
					{post.title}
				</Link>
			</h2>
			<time
				dateTime={post.date}
				className=" text-[#707070] mb-2 block text-xs "
			>
				{format(parseISO(post.date), "LLLL d, yyyy")}
			</time>
			<div
				className="text-white text-sm [&>*]:mb-3 [&>*:last-child]:mb-0"
				dangerouslySetInnerHTML={{ __html: post.body.html }}
			/>
		</div>
	);
}

export default function Home() {
	const posts = allPosts.sort((a, b) =>
		compareDesc(new Date(a.date), new Date(b.date))
	);

	return (
		<body className="pt-8 flex-col h-full px-12 md:px-24 lg:px-48 lg:pt-12 bg-[#201F1F] items-center">
			<Navbar />
			<div className="bg-[#201F1F] h-screen">
				<div className="mx-auto max-w-xl py-8 ">
					<h1 className="mb-8 text-center text-2xl text-white">Blog</h1>
					{posts.map((post, idx) => (
						<PostCard key={idx} {...post} />
					))}
				</div>
			</div>
		</body>
	);
}
