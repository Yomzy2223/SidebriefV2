import { Modal, Button, Badge } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import { ExternalLink } from "lucide-react";
import { FileInput } from "@/components/form/fileInput";
import { useGetProductQA } from "@/services/product";
import { FileType, productFormType, productQAType } from "@/services/product/types";
import { cn, sluggify } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useUploadActions } from "./uploadActions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDynamic } from "@/hooks/useDynamic";
import { useMemo, useState } from "react";
import { useActions } from "../../../info/[processId]/actions";
import { uploadFileToCloudinary } from "@/hooks/globalFunctions";

export const UploadForm = ({
  productId,
  forms,
  closer,
  selected,
  setSelected,
  formState,
}: {
  productId: string;
  forms: productFormType[];
  closer: () => void;
  selected: number;
  setSelected: (num: number) => void;
  formState: productQAType | productQAType[] | null;
}) => {
  const params: { service: string; processId: string } = useParams();
  const router = useRouter();

  const [uploading, setUploading] = useState(false);

  const productQA = useGetProductQA(productId);

  const allQA = productQA.data?.data.data;

  const persons = allQA?.filter((qa) => qa.type === "person");

  const { withDocument, getForm } = useUploadActions({ persons: persons || [] });

  const dynamic = useDynamic({
    subForms: withDocument(forms)[selected - 1].docs.map((doc) => ({
      name: sluggify(doc.question),
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
    setValue(sluggify(question), file);
  };

  const { saveFormProductQA, savingForm, updateFormProductQA, updatingForm } = useActions({
    form: getForm(forms, selected),
  });

  const submitUploadForm = async (values: { [key: string]: any }) => {
    setUploading(true);
    const promises = Object.keys(values).map(async (key) => {
      const result = await uploadFileToCloudinary({ file: values[key] });
      return result.data;
    });

    const uploaded = await Promise.all(promises);

    Object.keys(values).forEach((key, index) => {
      const oldValue = values[key];
      values[key] = {
        link: uploaded[index].secure_url,
        name: oldValue.name,
        size: `${oldValue.size}`,
        type: oldValue.type,
      } as FileType;
    });

    try {
      const response = await updateFormProductQA({
        values,
        requestFormState: !formState
          ? undefined
          : !Array.isArray(formState)
          ? formState
          : undefined,
        isGeneral: false,
      });
      console.log(response);
      setUploading(false);
      // go to next person
      setSelected(selected + 1);
    } catch (err) {
      setUploading(false);
    }
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
                        selectedFile={watch(sluggify(sub.question))}
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
          <Button color="gray" type="submit" isProcessing={uploading}>
            Go to next proprietor
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
};
