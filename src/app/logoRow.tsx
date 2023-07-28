import fs from "fs";
import Image from "next/image";
import path from "path";

// Function to get the list of logo file names from the logos folder
const getLogoFiles = () => {
	const logosDir = path.join(process.cwd(), "public", "logos");
	const fileNames = fs.readdirSync(logosDir);
	return fileNames;
};

const LogoGallery = () => {
	const logos = getLogoFiles();

	return logos.map((logo, index) => (
		<div key={index}>
			<Image
				src={`/logos/${logo}`}
				alt={`Logo ${index}`}
				width={40}
				height={40}
			/>
		</div>
	));
};

export default LogoGallery;
