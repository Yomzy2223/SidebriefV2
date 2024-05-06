"use client";

import Image from "next/image";
import { Tabs } from "flowbite-react";
import { getFileImage } from "@/hooks/globalFunctions";
import { useGetBusinessRequest } from "@/services/business";
import { useGetRequestQA } from "@/services/productQA";
import { TFormQAGet } from "@/services/productQA/types";
import { FileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon";
import { FileSkeletonLoader } from "./loader";

type documentType = {
  name: string;
  link: string;
  type: string;
  size: string;
};

export const DocumentComponent = ({
  files,
  businessId,
}: {
  files: { received: File[]; uploaded: File[] };
  businessId: string;
}) => {
  const getBusinessRequest = useGetBusinessRequest({ id: businessId });

  const businessRequest = getBusinessRequest.data?.data.data;

  const productRequestId = businessRequest?.productRequest[0].id;

  const getProductRequestQA = useGetRequestQA(productRequestId || "");

  const productRequestQA = getProductRequestQA.data?.data.data;

  const loading = getBusinessRequest.isLoading || getProductRequestQA.isLoading || !businessId;

  // console.log(productRequestQA);

  // console.log(productRequestQA);
  // console.log(loading);

  function getFiles(formData: TFormQAGet[]): documentType[] {
    const files: documentType[] = [];

    formData.forEach((form) => {
      form.subForm.forEach((subForm) => {
        if (subForm.type === "document upload" || subForm.type === "document template") {
          const file: documentType = {
            name: subForm.fileName,
            link: subForm.fileLink,
            type: subForm.fileType,
            size: subForm.fileSize,
          };
          files.push(file);
        }
      });
    });

    return files;
  }

  const documents = getFiles(productRequestQA || []);

  return (
    <Tabs style="underline">
      <Tabs.Item active title="Received" className="p-1">
        <RenderFile files={documents} loading={loading} />
      </Tabs.Item>
      <Tabs.Item title="Uploaded" className="p-1">
        <RenderFile files={[]} loading={loading} />
      </Tabs.Item>
    </Tabs>
  );
};

const RenderFile = ({ files, loading }: { files: documentType[]; loading: boolean }) => {
  return (
    <div className="space-y-4 max-h-[380px] overflow-auto">
      {loading
        ? Array.from({ length: 5 }, (_, i) => <FileSkeletonLoader key={i} />)
        : files.map((file, i) => (
            <div
              key={file.name + i}
              className="sb-text-16 flex items-center leading-normal rounded-[50px] py-4 px-6 bg-[#FAFAFA]"
            >
              <div className="mr-2 w-6 h-6">
                <FileIcon
                  extension={file.type}
                  {...defaultStyles[file.type as DefaultExtensionType]}
                  glyphColor={`${file.type === "pdf" && "red"}`}
                />
              </div>
              {/* <Image src={getFileImage(file.type)} alt={file.name} className="" /> */}
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
