import Image from "next/image";
import Navbar from "./navbar";
import selfie from "./pfpgimpcropped.jpg";

export default function Home() {
  return (
    <body className="text-inter pt-8 flex-col h-full px-12 md:px-24 lg:px-48 lg:pt-12 bg-[#201F1F]">
      <Navbar></Navbar>

      <div className="flex">
        {/* this div's contents go right to left */}
        <div className="lg:max-w-2xl">
          {/* this div holds the first page text*/}
          <h1 className="text-white mt-16 text-xl lg:text-5xl ">
            Hi, I&apos;m Ryan.<br></br>I do computer stuff.
          </h1>
          <p className="text-white lg:text-2xl text-xs mt-4">
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
        <div className="lg:flex md:flex lg:justify-center pt-16 pl-8 md:p-16 lg:w-1/2 lg:pl">
          <Image
            placeholder="blur"
            className="rounded"
            src={selfie}
            alt="Picture of me"
            height={400}
            width={400}
          ></Image>
        </div>
      </div>
    </body>
  );
}
