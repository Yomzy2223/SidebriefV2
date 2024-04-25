import { Button, Card, Badge } from "@/components/flowbite";
import { PencilLine } from "lucide-react";
import { SwatchBook } from "@/assets/icons";
import { MemberInfoReviewCard } from "@/components/cards/proprietorInfoReviewCard";
<<<<<<< HEAD

export const ProprietorInfoReview = () => {
=======
import { useGetProductQA } from "@/services/product";
import { productQAType } from "@/services/product/types";

export const ProprietorInfoReview = ({ productId }: { productId: string }) => {
  const productQA = useGetProductQA(productId);

  const allQA = productQA.data?.data.data;

  const onlyPersons = allQA?.filter((el) => el.type == "person");

  const onlyPersonsDocuments = onlyPersons?.filter((el) => el.title.includes("document"));

  const consolidated: productQAType[] | undefined = [];
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

>>>>>>> origin/staging
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
<<<<<<< HEAD
        <MemberInfoReviewCard />
        <MemberInfoReviewCard />
        <MemberInfoReviewCard />
=======
        {consolidated.map((person, i) => (
          <MemberInfoReviewCard
            key={i}
            type={person.title}
            name={person.subForm[0].answer[0]}
            email={person.subForm[2].answer[0]}
          />
        ))}

        {/* <MemberInfoReviewCard />
        <MemberInfoReviewCard /> */}
>>>>>>> origin/staging
      </div>
    </div>
  );
};
