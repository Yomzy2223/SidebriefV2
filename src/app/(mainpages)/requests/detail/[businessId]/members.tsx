import { useParams, useSearchParams } from "next/navigation";
import { MemberInfoReviewCards } from "@/components/cards/proprietorInfoReviewCard";
import { TFieldTypes } from "@/services/service/types";
import { useGetRequestQA } from "@/services/productQA";
import { TFormQAGet } from "@/services/productQA/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { EmptyPage } from "./empty";

export const Members = () => {
  const { businessId } = useParams();

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const requestId = searchParams.get("requestId") || "";

  const productQA = useGetRequestQA(requestId);

  const allQA = productQA.data?.data.data;

  const onlyPersons = allQA?.filter((el) => el.type == "person");

  const onlyPersonsDocuments = onlyPersons?.filter((el) => el.title.includes("document"));

  const consolidated: TFormQAGet[] | undefined = [];
  const uniqueObjects = new Set();

  onlyPersons
    ?.filter((el) => !el.title.includes("document"))
    .forEach((el) => {
      // const withDoc = onlyPersonsDocuments?.find(
      //   (doc) => doc.description === el.subForm[0].answer[0]
      // );
      // const updatedObject = withDoc ? { ...el, subForm: [...el.subForm, ...withDoc.subForm] } : el;
      const updatedObject = el;

      if (!uniqueObjects.has(updatedObject.subForm[0].answer[0])) {
        uniqueObjects.add(updatedObject.subForm[0].answer[0]);
        consolidated.push(updatedObject);
      }
    });

  const loading = productQA.isLoading;

  return (
    <div className="flex flex-wrap gap-6">
      {loading ? (
        [...Array(3)].map((_, index) => <MemberSkeletonLoader key={index} />)
      ) : consolidated.length <= 0 && !loading ? (
        <EmptyPage text="Nothing here yet" />
      ) : (
        <MemberInfoReviewCards
          title={"Proprietor"}
          fill
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
      )}
    </div>
  );
};

export const MemberSkeletonLoader = () => {
  return (
    <div className={cn("transition-all border border-border rounded w-[235px]")}>
      <div className="sticky left-0 flex justify-between gap-6 p-4 pb-0 bg-[#F9FAFB]">
        <div className="flex gap-4">
          <Skeleton className="w-24 h-6 bg-gray-300" />
        </div>
        <Skeleton className="w-6 h-6 bg-gray-300" />
      </div>
      <div className="min-w-max bg-[#F9FAFB] p-4">
        <div className="flex gap-4">
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="w-full h-6 bg-gray-300" />
            <Skeleton className="w-full h-6 bg-gray-300" />
            <Skeleton className="w-full h-6 bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
