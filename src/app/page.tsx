import Image from "next/image";
import Navbar from "./navbar";

export default function Home() {
  return (
    <body className="text-inter pt-8 flex-col h-full px-12 md:px-24 bg-[#201F1F]">
      <Navbar></Navbar>
      <h1 className="text-white mt-16 text-2xl">
        Hi, I&apos;m Ryan.<br></br>I do computer stuff.
      </h1>
      <p className="text-white text-xs mt-4">
        I&apos;m studying compsci and physics at ASU.
      </p>
      <p className="text-white text-xs mt-4">
        I&apos;m
        <i>
          <strong> CRIPPLINGLY </strong>
        </i>
        passionate about understanding technology on a granular, mechanistic
        level and using that technical understanding to move fast and build
        creative solutions.
      </p>
      <p className="text-white text-xs mt-4">
        My current focus is on infrastructure automation and building continuous
        deployment/integration pipelines.
      </p>
    </body>
  );
}
