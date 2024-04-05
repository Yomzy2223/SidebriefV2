import { Modal, Button, Badge } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import { ExternalLink } from "lucide-react";
import { FileInput } from "@/components/form/fileInput";
import { useGetProductQA } from "@/services/product";
import { productFormType } from "@/services/product/types";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useUploadActions } from "./uploadActions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDynamic } from "@/hooks/useDynamic";
import { useState } from "react";

export const UploadForm = ({
  productId,
  forms,
  closer,
  selected,
  setSelected,
}: {
  productId: string;
  forms: productFormType[];
  closer: () => void;
  selected: number;
  setSelected: (num: number) => void;
}) => {
  const params: { service: string; processId: string } = useParams();
  const router = useRouter();

  const productQA = useGetProductQA(productId);

  const allQA = productQA.data?.data.data;

  const persons = allQA?.filter((qa) => qa.type === "person");

  const { withDocument } = useUploadActions({ persons: persons || [] });
  2;
  const dynamic = useDynamic({
    subForms: withDocument(forms)[selected - 1].docs.map((doc) => ({
      name: doc.question,
      type: doc.type,
    })),
    isLoading: productQA.isLoading,
  });

  const schema = dynamic.schema;
  const dValues = dynamic.defaultValues;

  type formType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    control,
    reset,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: dValues,
  });

  const handleFileUpload: (file: File, question: string) => Promise<any> = async (
    file: File,
    question
  ) => {
    setValue(question, file);
  };

  const submitUploadForm = (values: { [key: string]: any }) => {
    console.log(values, selected);
  };

  const completeDone = () => {
    router.push(`/dashboard/${params.service}/review`);
    closer();
  };

  // console.log(watch());

  return (
    <>
      <form onSubmit={handleSubmit(submitUploadForm)} className="overflow-y-auto">
        <Modal.Body className="py-11 px-5 space-y-8">
          {withDocument(forms) && (
            <div className="flex gap-2.5 flex-wrap">
              {withDocument(forms).map((form, index) => (
                // the persons
                <Badge
                  key={index}
                  color={index + 1 === selected ? "yellow" : "green"}
                  icon={SwatchBook}
                  onClick={() => setSelected(index + 1)}
                  className={cn("cursor-pointer", {
                    "opacity-50": index + 1 !== selected,
                  })}
                >
                  <div className="flex gap-0.5 items-center">
                    {form.title}
                    {/* <X className="h-3 cursor-pointer" /> */}
                  </div>
                </Badge>
              ))}
            </div>
          )}
          <div className="space-y-6">
            <div className="flex justify-between">
              <h4 className="text-2xl font-semibold text-gray-900 leading-normal">
                Upload {withDocument(forms)[selected - 1].title}
                {withDocument(forms)[selected - 1].isPerson && "'s"} Document
              </h4>
              <Button color="link" size={"fit"}>
                <div className="flex gap-2 items-center">
                  See details <ExternalLink size={16} />
                </div>
              </Button>
            </div>
            {productQA.isLoading ? (
              <>Loading...</>
            ) : (
              // TODO: figure out how to do document template
              <div className="grid grid-cols-2 gap-5">
                {withDocument(forms)
                  [selected - 1]?.docs?.filter((sub) => sub.type === "document upload")
                  .map((sub) => {
                    return (
                      <FileInput
                        key={sub.id}
                        name={sub.question}
                        handleFileChange={handleFileUpload}
                        selectedFile={watch(sub.question)}
                      />
                    );
                  }) || <p>No matching form found.</p>}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button onClick={completeDone} color="secondary">
            Done
          </Button>
          <Button color="gray" type="submit">
            Go to next proprietor
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
};
