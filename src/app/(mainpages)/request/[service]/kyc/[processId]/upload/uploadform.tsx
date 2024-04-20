import { Modal, Button, Badge } from "@/components/flowbite";
import { SwatchBook } from "@/assets/icons";
import { ExternalLink } from "lucide-react";
import { FileInput } from "@/components/form/fileInput";
import { useGetRequestQA } from "@/services/productQA";
import { FileType, IForm, IFormQA } from "@/services/productQA/types";
import { cn, sluggify } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useUploadActions } from "./uploadActions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDynamic } from "@/hooks/useDynamic";
import { useEffect, useMemo, useState } from "react";
import { isFileType, useActions } from "../../../info/[processId]/actions";
import { uploadFileToCloudinary } from "@/hooks/globalFunctions";
import { useToast } from "@/components/ui/use-toast";

export const UploadForm = ({
  productId,
  forms,
  closer,
  selected,
  setSelected,
  values,
  formState,
  refetch,
}: {
  productId: string;
  forms: IForm[];
  closer: () => void;
  selected: number;
  setSelected: (num: number) => void;
  values: { [key: string]: string | FileType | string[] };
  formState: IFormQA | IFormQA[] | null;
  refetch: () => Promise<any>;
}) => {
  const [isDone, setIsDone] = useState(false);
  const params: { service: string; processId: string } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [uploading, setUploading] = useState(false);

  const productQA = useGetRequestQA(productId);

  const allQA = productQA.data?.data.data;

  const persons = allQA?.filter((qa) => qa.type === "person");

  const { withDocument, getForm, checkAllUploaded } = useUploadActions({
    persons: persons || [],
    forms,
  });

  const dynamic = useDynamic({
    subForms: withDocument()[selected - 1].docs.map((doc) => ({
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

  useEffect(() => {
    // if (JSON.stringify(prevFormInfoRef.current) !== JSON.stringify(formInfo)) {
    Object.keys(values).forEach((key) => {
      if (isFileType(values[key])) {
        setValue(key, values[key]);
      }
    });
    // prevFormInfoRef.current = formInfo;
    // }
    return () => {
      Object.keys(values).forEach((key) => {
        if (isFileType(values[key])) {
          setValue(key, null);
        }
      });
    };
  }, [setValue, values]);

  const handleFileUpload: (file: File, question: string) => Promise<any> = async (
    file: File,
    question
  ) => {
    setValue(sluggify(question), file);
  };

  const { saveFormProductQA, savingForm, updateFormProductQA, updatingForm } = useActions({
    form: getForm(selected),
  });

  const submitUploadForm = async (values: { [key: string]: any }) => {
    setUploading(true);
    const promises = Object.keys(values).map(async (key) => {
      if (values[key] instanceof File) {
        const result = await uploadFileToCloudinary({ file: values[key] });
        return result.data;
      } else return values[key];
    });

    const uploaded = await Promise.all(promises);

    Object.keys(values).forEach((key, index) => {
      const oldValue = values[key];
      values[key] = {
        link: uploaded[index].secure_url || oldValue.link,
        name: oldValue.name,
        size: `${oldValue.size}`,
        type: oldValue.type,
      } as FileType;
    });

    try {
      if (!formState) {
        console.log("saving");
        await saveFormProductQA({
          values,
          productId,
          isGeneral: false,
          fileDescription: withDocument()[selected - 1].title,
        });
      } else {
        console.log("updating");
        await updateFormProductQA({
          requestFormState: !Array.isArray(formState) ? formState : formState[0],
          values: values,
          isGeneral: false,
          fileDescription: withDocument()[selected - 1].title,
        });
        await refetch();
      }
      setUploading(false);

      if (!isDone) {
        // go to next person
        setSelected(selected + 1);
      }

      if (isDone) {
        completeDone();
        setIsDone(false);
      }
    } catch (err) {
      setUploading(false);
    }
  };

  const completeDone = async () => {
    await productQA.refetch();

    // check if all files have been uploaded
    if (checkAllUploaded(allQA || [])) {
      // proceed to the next page
      router.push(`/request/${params.service}/review/${params.processId}`);
      // closer();
    } else {
      toast({
        className: "bg-red-200 border border-destructive-foreground",
        title: "Missing files",
        description: "some required files are missing",
        success: false,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitUploadForm)} className="overflow-y-auto">
        <Modal.Body className="py-11 px-5 space-y-8">
          {withDocument() && (
            <div className="flex gap-2.5 flex-wrap">
              {withDocument().map((form, index) => (
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
                Upload {withDocument()[selected - 1].title}
                {withDocument()[selected - 1].isPerson && "'s"} Document
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
                {withDocument()
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
          <Button
            onClick={() => {
              setIsDone(true);
            }}
            isProcessing={uploading && isDone}
            color="secondary"
            type="submit"
          >
            Done
          </Button>
          {!!withDocument()[selected] && (
            <Button color="gray" type="submit" isProcessing={uploading && !isDone}>
              Go to next proprietor
            </Button>
          )}
        </Modal.Footer>
      </form>
    </>
  );
};
