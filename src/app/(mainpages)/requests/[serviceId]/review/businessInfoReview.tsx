"use client";

import { Button, TextInput, Label, Badge } from "@/components/flowbite";
import { PencilLine } from "lucide-react";
import { SwatchBook } from "@/assets/icons";
import { sluggify } from "@/lib/utils";
import { useGetRequestQA } from "@/services/productQA";
import { TProductRequest } from "@/services/business/types";
import { TFormQAGet } from "@/services/productQA/types";

export const BusinessInfoReview = ({ productId }: { productId: string }) => {
  const productQA = useGetRequestQA(productId);

  const allQA = productQA.data?.data.data;

  const onlyForms = allQA?.filter((el) => el.type !== "person");

  const onlyFormsDocuments = onlyForms?.filter((el) => el.title.includes("document"));

  const consolidated: TFormQAGet[] | undefined = [];
  const uniqueObjects = new Set();

  onlyForms
    ?.filter((el) => !el.title.includes("document"))
    .forEach((el) => {
      const withDoc = onlyFormsDocuments?.find((doc) => doc.description === el.title);
      const updatedObject = withDoc ? { ...el, subForm: [...el.subForm, ...withDoc.subForm] } : el;

      if (!uniqueObjects.has(updatedObject.title)) {
        uniqueObjects.add(updatedObject.title);
        consolidated.push(updatedObject);
      }
    });

  return (
    <div className="space-y-8">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <h4 className="text-sm leading-normal text-foreground-3 mb-1">REVIEW & SUBMISSION</h4>
          <h6 className="text-2xl leading-normal font-semibold">Business Information Review</h6>
        </div>
        {/* <Button color="link" size={"fit"} className="self-end text-sm">
          Edit <PencilLine strokeWidth={1} size={16} />
        </Button> */}
      </div>
      {consolidated?.map((el, i) => (
        <div key={i} className="space-y-5">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <h6 className="text-xl leading-normal font-semibold">{el.title}</h6>
            </div>
            <Button color="link" size={"fit"} className="self-end text-sm">
              Edit <PencilLine strokeWidth={1} size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-8">
            {el.subForm.map((subform) => (
              <div className="space-y-2" key={subform.id}>
                <Label htmlFor={sluggify(subform.question)} value={subform.question} />
                <TextInput
                  id={sluggify(subform.question)}
                  value={subform.answer.length === 1 ? subform.answer[0] : ""}
                  disabled
                />
                {subform.answer.length > 1 && (
                  <div className="flex flex-wrap gap-2.5 mt-2">
                    {subform.answer.map((answer, i) => (
                      <Badge key={i} color={"green"} icon={SwatchBook}>
                        {answer}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
