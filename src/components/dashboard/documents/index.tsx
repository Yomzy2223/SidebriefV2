"use client";

import Image from "next/image";
import { imageTypeImage } from "@/lib/utils";
import { Download } from "@/assets/svg";
import { Tabs } from "flowbite-react";

interface File {
	id?: string;
	name: string;
	type: string;
}

const renderFile = (file: File) => {
	const fileType = imageTypeImage.find((type) => type.type === file.type);

	if (fileType) {
		return (
			<span className="flex items-center justify-between" key={file.id}>
				<Image
					src={fileType.image}
					alt={file.name}
					className="mr-2 w-6 h-6"
				/>
				<span className="flex items-center flex-grow ">
					<span className="underline mr-16">{file.name}</span>
					{/* <p className="text-primary ml-auto">
						<Image src={Download} alt="Download" />
					</p> */}
				</span>
			</span>
		);
	}

	return null;
};

export const DocumentComponent = ({ files }: { files: File[] }) => {
	return (
		<Tabs style="underline">
			<Tabs.Item active title="Uploaded">
				<div className="space-y-6">
					{files.map((file) => (
						<h3
							className="text-lg leading-normal font-semibold border rounded-[50px] py-4 px-6"
							key={file.id}
						>
							{renderFile(file)}
						</h3>
					))}
				</div>
			</Tabs.Item>
		</Tabs>
	);
};
