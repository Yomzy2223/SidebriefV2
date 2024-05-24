import { sluggify } from "@/lib/utils";
import { useGetRequestQA } from "@/services/productQA";
import { TFormQAGet } from "@/services/productQA/types";
import { Badge, Button, Label, TextInput } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { SwatchBook } from "@/assets/icons";
import { FileInput } from "@/components/file/fileInput";

export const Forms = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const requestId = searchParams.get("requestId") || "";

  const productQA = useGetRequestQA(requestId || "");

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

  // const navigate = ({ page }: { page: "info" | "forms" }) => {
  //   setQueriesWithPath({
  //     path: `/requests/${params.serviceId}/${page}`,
  //     // queries: [{ name: "activeTab", value: "2" }],
  //   });
  // };

  return (
    <div className="space-y-8">
      {consolidated?.map((el, i) => {
        return (
          <div key={i} className="space-y-5 rounded border p-10">
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <h6 className="text-xl leading-normal font-semibold">{el.title}</h6>
              </div>
              {/* <Button
                color="link"
                size={"fit"}
                className="self-end text-sm"
                onClick={() => navigate({ page: el.isGeneral ? "info" : "forms" })}
              >
                Edit <PencilLine strokeWidth={1} size={16} />
              </Button> */}
            </div>
            <div className="flex flex-wrap justify-between gap-8">
              {el.subForm.map((subform) => {
                if (subform.type.includes("document") && subform.fileName !== "") {
                  <div
                    className="space-y-2 w-full lg:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.5rem)]"
                    key={subform.id}
                  >
                    <Label htmlFor={sluggify(subform.question)} value={subform.question} />
                    <FileInput
                      fileName={subform.fileName}
                      fileLink={subform.fileLink}
                      fileSize={subform.fileSize}
                      fileType={subform.fileType}
                      onlyDownload
                    />
                  </div>;
                }

                if (subform.type.includes("document") && subform.fileName === "") {
                  return;
                }

                if (subform.answer[0] === "" && !subform.type.includes("document")) return;

                return (
                  <div
                    className="space-y-2 w-full lg:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.5rem)]"
                    key={subform.id}
                  >
                    <Label htmlFor={sluggify(subform.question)} value={subform.question} />

                    {subform.answer && (
                      <TextInput
                        id={sluggify(subform.question)}
                        value={subform.answer.length === 1 ? subform.answer[0] : ""}
                        disabled
                      />
                    )}
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
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
