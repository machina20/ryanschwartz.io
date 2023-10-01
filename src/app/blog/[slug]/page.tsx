import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { allPosts } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import ViewCounter from "../view-counter";
import { Suspense } from "react";
import Navbar from "@/app/navbar";

export async function generateMetadata({
	params,
}: {
	params: {
		slug: string;
	};
}): Promise<Metadata | undefined> {
	const post = allPosts.find((post) => post.url === params.slug);
	if (!post) {
		return;
	}

	const { title, date: publishedTime, url } = post;

	return {
		title,

		openGraph: {
			title,

			type: "article",
			publishedTime,
			url: `https://ryanschwartz.io/blog/${params.slug}`,
			images: [],
		},
		twitter: {
			card: "summary_large_image",
			title,
		},
	};
}

function formatDate(date: string) {
	const currentDate = new Date();
	const targetDate = new Date(date);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = "Today";
	}

	const fullDate = targetDate.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	return `${fullDate} (${formattedDate})`;
}

export default async function Blog({
	params,
}: {
	params: {
		slug: string;
	};
}) {
	console.log(params.slug);
	const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

	if (!post) {
		return <div>This page does not exist</div>;
	}
	return (
		<body className="pt-8 flex-col h-full px-12 md:px-24 lg:px-48 lg:pt-12 bg-[#201F1F] items-center">
			<Navbar />

			<div className="bg-[#201F1F] h-screen text-white">
				<div className="mx-auto max-w-xl py-8 ">
					<script
						type="application/ld+json"
						suppressHydrationWarning
						dangerouslySetInnerHTML={{
							//not sure about this vvv
							__html: JSON.stringify(post._raw),
						}}
					></script>
					<h1 className="font-bold text-2xl text-white tracking-tighter max-w-[650px]">
						<Balancer>{post.title}</Balancer>
					</h1>
					<div className="flex justify-between text-white items-center mt-2 mb-8 text-sm max-w-[650px]">
						<p className="text-sm text-white dark:text-neutral-400">
							{formatDate(post.date)}
						</p>
						{/* I also want an error boundary here */}
						{/* <Suspense>
							<Views slug={post.url} />
						</Suspense> */}
					</div>
					<Mdx code={post.body.code} />
				</div>
			</div>
		</body>
	);
}

// async function Views({ slug }: { slug: string }) {
// 	let views;
// 	try {
// 		views = await ViewCounter({
// 			slug: slug,
// 			allViews: { slug: slug, count: [] },
// 		});
// 	} catch (error) {
// 		console.error(error);
// 	}
// 	return <ViewCounter allViews={views} slug={slug} trackView />;
// }
