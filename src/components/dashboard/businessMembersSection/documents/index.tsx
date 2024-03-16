"use client";

import Image from "next/image";
import { Tabs } from "flowbite-react";
import { getFileImage } from "@/hooks/globalFunctions";

export const DocumentComponent = ({ files }: { files: { received: File[]; uploaded: File[] } }) => {
  return (
    <Tabs style="underline">
      <Tabs.Item active title="Received" className="p-1">
        {renderFile(files.received)}
      </Tabs.Item>
      <Tabs.Item title="Uploaded" className="p-1">
        {renderFile(files.uploaded)}
      </Tabs.Item>
    </Tabs>
  );
};

const renderFile = (files: File[]) => {
  return (
    <div className="space-y-4 max-h-[380px] overflow-auto">
      {files.map((file, i) => (
        <div
          key={file.name + i}
          className="sb-text-16 flex items-center leading-normal border rounded-[50px] py-4 px-6"
        >
          <Image src={getFileImage(file.type)} alt={file.name} className="mr-2 w-6 h-6" />
          <span className="underline text-ellipsis whitespace-nowrap overflow-hidden">
            {file.name}
          </span>
        </div>
      ))}
    </div>
  );
};

interface File {
  id?: string;
  name: string;
  type: string;
}
