"use client";

import Image from "next/image";
import { Tabs } from "flowbite-react";
import { getFileImage } from "@/hooks/globalFunctions";
import { useGetBusinessRequest, useGetRequestDocuments } from "@/services/business";
import { useGetRequestQA } from "@/services/productQA";
import { TFormQAGet } from "@/services/productQA/types";
import { FileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon";
import { FileSkeletonLoader } from "./loader";
import { NotFoundCard } from "@/components/cards/NotFoundCard";
import { IDocument, TBusinessDataFull } from "@/services/business/types";

export const DocumentComponent = ({
  businessRequest,
  isLoading,
}: {
  businessRequest?: TBusinessDataFull;
  isLoading: boolean;
}) => {
  const productRequestId = businessRequest?.productRequest[0]?.id;

  const getRequestdocuments = useGetRequestDocuments(productRequestId || "");
  const requestDocuments = getRequestdocuments.data?.data.data;

  // const getProductRequestQA = useGetRequestQA(requestId || "");
  // const productRequestQA = getProductRequestQA.data?.data.data;

  function getFiles(documents: IDocument[]): documentType[] {
    const files: documentType[] = [];

    documents.forEach((doc) => {
      if (doc.name) {
        const file: documentType = {
          name: doc.name,
          link: doc.link,
          type: doc.type,
          size: doc.size,
        };
        files.push(file);
      }
    });

    return files;
  }

  const documents = getFiles(requestDocuments || []);

  const loading = getRequestdocuments.isLoading || isLoading;

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
      {loading ? (
        Array.from({ length: 5 }, (_, i) => <FileSkeletonLoader key={i} />)
      ) : files.length > 0 ? (
        files.map((file, i) => (
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
        ))
      ) : (
        <div className="grid place-items-center h-[380px] w-full">
          <NotFoundCard />
        </div>
      )}
    </div>
  );
};

interface File {
  id?: string;
  name: string;
  type: string;
}

type documentType = {
  name: string;
  link: string;
  type: string;
  size: string;
};
