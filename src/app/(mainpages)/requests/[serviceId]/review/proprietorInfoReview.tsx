import { Button, Card, Badge } from "@/components/flowbite";
import { PencilLine } from "lucide-react";
import { SwatchBook } from "@/assets/icons";
import { MemberInfoReviewCards } from "@/components/cards/proprietorInfoReviewCard";
import { useGetRequestQA } from "@/services/productQA";
import { TProductRequest } from "@/services/business/types";
import { TFormQAGet } from "@/services/productQA/types";
import { TFieldTypes } from "@/services/service/types";

export const ProprietorInfoReview = ({ productId }: { productId: string }) => {
  const productQA = useGetRequestQA(productId);

  const allQA = productQA.data?.data.data;

  const onlyPersons = allQA?.filter((el) => el.type == "person");

  const onlyPersonsDocuments = onlyPersons?.filter((el) => el.title.includes("document"));

  const consolidated: TFormQAGet[] | undefined = [];
  const uniqueObjects = new Set();

  onlyPersons
    ?.filter((el) => !el.title.includes("document"))
    .forEach((el) => {
      const withDoc = onlyPersonsDocuments?.find(
        (doc) => doc.description === el.subForm[0].answer[0]
      );
      // const updatedObject = withDoc ? { ...el, subForm: [...el.subForm, ...withDoc.subForm] } : el;
      const updatedObject = el;

      if (!uniqueObjects.has(updatedObject.subForm[0].answer[0])) {
        uniqueObjects.add(updatedObject.subForm[0].answer[0]);
        consolidated.push(updatedObject);
      }
    });

  return (
    <div className="space-y-8">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <h4 className="text-sm leading-normal text-foreground-3 mb-1">REVIEW & SUBMISSION</h4>
          <h6 className="text-2xl leading-normal font-semibold">Proprietor Information Review</h6>
        </div>
        <Button color="link" size={"fit"} className="self-end text-sm">
          Edit <PencilLine strokeWidth={1} size={16} />
        </Button>
      </div>
      <div className="flex flex-wrap gap-6">
        <MemberInfoReviewCards
          title={"Proprietor"}
          info={consolidated.map((each) => {
            return each.subForm.map((el) => {
              return {
                field: el.question,
                value: el.answer[0],
                type: el.type as TFieldTypes | undefined,
                fileName: el.fileName,
                fileLink: el.fileLink,
                fileType: el.fileType,
                fileSize: el.fileSize,
              };
            });
          })}
        />
      </div>
    </div>
  );
};
