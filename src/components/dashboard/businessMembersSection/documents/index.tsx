"use client";

import Image from "next/image";
import { Tabs } from "flowbite-react";
import { getFileImage } from "@/hooks/globalFunctions";
import { useGetBusinessRequest } from "@/services/business";
import { useGetRequestQA } from "@/services/productQA";

export const DocumentComponent = ({
  files,
  businessId,
}: {
  files: { received: File[]; uploaded: File[] };
  businessId: string;
}) => {
  const getBusinessRequest = useGetBusinessRequest({ id: businessId });

  const businessRequest = getBusinessRequest.data?.data.data;

  const productRequestId = businessRequest?.productRequest[0]?.id;

  const getProductRequestQA = useGetRequestQA(productRequestId || "");

  const productRequestQA = getProductRequestQA.data?.data.data;

  const loading = getBusinessRequest.isLoading || getProductRequestQA.isLoading || !businessId;

  // console.log(productRequestQA);
  // console.log(loading);

  return (
    <Tabs style="underline">
      <Tabs.Item active title="Received" className="p-1">
        <RenderFile files={files.received} />
      </Tabs.Item>
      <Tabs.Item title="Uploaded" className="p-1">
        <RenderFile files={files.uploaded} />
      </Tabs.Item>
    </Tabs>
  );
};

const RenderFile = ({ files }: { files: File[] }) => {
  return (
    <div className="space-y-4 max-h-[380px] overflow-auto">
      {files.map((file, i) => (
        <div
          key={file.name + i}
          className="sb-text-16 flex items-center leading-normal rounded-[50px] py-4 px-6 bg-[#FAFAFA]"
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
