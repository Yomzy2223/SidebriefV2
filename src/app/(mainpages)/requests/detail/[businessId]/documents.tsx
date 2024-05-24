import { useGetRequestQA } from "@/services/productQA";
import { TFormQAGet } from "@/services/productQA/types";
import { FileInput } from "@/components/file/fileInput";
import { useSearchParams } from "next/navigation";

type documentType = {
  name: string;
  link: string;
  type: string;
  size: string;
};

export const Documents = () => {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId") || "";

  const getProductRequestQA = useGetRequestQA(requestId || "");

  const productRequestQA = getProductRequestQA.data?.data.data;

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
    <div className="flex flex-wrap gap-6">
      {documents.map((each, i) =>
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
