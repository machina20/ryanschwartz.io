import Image from "next/image";
import Navbar from "./navbar";
import selfie from "./pfpgimpcropped.jpg";
import LogoRow from "./logoRow";

const logos = LogoRow();

export default function Home() {
	return (
		<body className="pt-8 flex-col h-full px-12 md:px-24 lg:px-48 lg:pt-12 bg-[#201F1F] items-center">
			<Navbar />

			<div className="flex justify-center">
				{/* this div's contents go right to left */}
				<div className="lg:pr-16">
					{/* this div holds the first page text*/}
					<h1 className="text-white mt-16 text-xl lg:text-5xl lg:pt-16 ">
						Hi, I&apos;m Ryan.<br></br>I do computer stuff.
					</h1>
					<p className="text-white lg:text-2xl text-xs mt-4 lg:py-8">
						I&apos;m studying compsci and physics at ASU.
					</p>
					<p className="text-white lg:text-2xl text-xs mt-4">
						I&apos;m
						<i>
							<strong> CRIPPLINGLY </strong>
						</i>
						passionate about understanding technology on a granular, mechanistic
						level and using that technical understanding to move fast and build
						creative solutions.
					</p>
					<p className="text-white lg:text-2xl text-xs mt-4">
						My current focus is on infrastructure automation and building
						continuous deployment/integration pipelines.
					</p>
				</div>

				<div className="lg:flex md:flex  lg:justify-center pt-16 pl-8 md:p-16 lg:w-1/2 lg:pl ">
					<Image
						placeholder="blur"
						className="rounded hover:"
						src={selfie}
						alt="Picture of me"
						height={400}
						width={400}
					></Image>
				</div>
			</div>
			<div className="flex-col items-center pt-32">
				<h1 className="flex justify-center text-white pb-8 text-xl lg:text-5xl">
					Tech I use
				</h1>
				<div className="flex items-center justify-center py-8 ">{logos}</div>
			</div>

			<div className="pt-64 flex flex-col items-center">
				<h1 className="flex justify-center text-white pb-8 text-xl lg:text-5xl">
					Chosen Projects
				</h1>

				<button className="mt-8 rounded-xl hover:text-black hover:bg-white transition-all ease-linear duration-300  bg-black text-white py-10 px-64">
					Project 1
				</button>
				<button className="mt-8 rounded-xl hover:text-black hover:bg-white transition-all ease-linear duration-300  bg-black text-white py-10 px-64">
					Project 2
				</button>
				<button className="my-8 rounded-xl hover:text-black hover:bg-white transition-all ease-linear duration-300  bg-black text-white py-10 px-64">
					Project 3
				</button>
			</div>
		</body>
	);
}
