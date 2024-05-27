import { useGetRequestQA } from "@/services/productQA";
import { TFormQAGet } from "@/services/productQA/types";
import { FileInput } from "@/components/file/fileInput";
import { useParams, useSearchParams } from "next/navigation";
import { useGetRequestDocuments } from "@/services/business";
import { SVGSkeleton, Skeleton } from "@/components/ui/skeleton";
import { IDocument } from "@/services/business/types";

type documentType = {
  name: string;
  link: string;
  type: string;
  size: string;
};

export const Documents = () => {
  const searchParams = useSearchParams();
  const params: { businessId: string } = useParams();
  const requestId = searchParams.get("requestId") || "";
  const businessId = params.businessId;

  const getRequestdocuments = useGetRequestDocuments(requestId);
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

  const loading = getRequestdocuments.isLoading;

  return (
    <div className="flex flex-wrap gap-6">
      {loading
        ? [...Array(3)].map((_, index) => <FileUploadSkeleton key={index} />)
        : documents.map((each, i) =>
            each.name && each.link && each.type && each.size ? (
              <div key={i} className="max-w-[400px] w-full">
                <FileInput
                  fileName={each.name}
                  fileLink={each.link}
                  fileSize={each.size}
                  fileType={each.type}
                  onlyDownload
                />
              </div>
            ) : null
          )}
    </div>
  );
};

export const FileUploadSkeleton = () => (
  <div className="bg-gray-50 rounded-lg border-2 border-gray-200 flex items-center justify-start p-2 w-96">
    <div className="flex items-center space-x-3">
      <SVGSkeleton className="w-4 h-4" />
      <div>
        <Skeleton className="h-4 w-28 mb-1" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  </div>
);
