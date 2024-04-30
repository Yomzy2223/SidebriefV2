import { IFormInput } from "@/components/form/constants";
import { z } from "zod";

export const useDynamic = ({
  isLoading = false,
  subForms,
}: {
  isLoading?: boolean;
  subForms?: IFormInput[];
}) => {
  const fileValidation = (file: File) => {
    // if (!file) {
    //   return false;
    // }

    // const validImageTypes = [
    //   "image/jpeg",
    //   "image/png",
    //   "image/gif",
    //   "application/msword",
    //   "application/pdf",
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // ];
    // if (!validImageTypes.includes(file.type)) {
    //   return false;
    // }

    // const maxFileSize = 5 * 1024 * 1024; // 5MB
    // if (file.size > maxFileSize) {
    //   return false;
    // }

    return true;
  };

  // generate a zod schema based on the subforms data
  const schema =
    isLoading || subForms === undefined
      ? z.object({})
      : z.object(
          Object.fromEntries(
            subForms.map((field) => {
              switch (field.type) {
                case "business name":
                  return [
                    field.name,
                    z
                      .array(z.string().min(3, "Name must have at least three character"))
                      .length(4, "Enter exactly 4 business names"),
                  ];
                case "objectives":
                  // let objectivesSchema = z.array(z.string());
                  // if (field.compulsory) {
                  // 	objectivesSchema =
                  // 		objectivesSchema.length(
                  // 			4,
                  // 			"Enter  4 business objectives"
                  // 		);
                  // }
                  // return [field.type, objectivesSchema];
                  return [field.name, z.array(z.string()).min(1, "Select business objectives")];
                case "country":
                  return [field.name, z.string().min(1, "Select a country")];
                case "address":
                  return [field.name, z.string().min(1, "This field is required")];
                case "email":
                  return [field.name, z.string().email().min(1, "Enter email address")];
                case "phone number":
                  return [field.name, z.coerce.number().min(1, "Enter phone number")];
                case "short answer":
                  return [field.name, z.string().min(1, "This field is required")];
                case "countries-all":
                  return [field.name, z.string().min(1, "Select a country")];
                case "document upload":
                  return [
                    field.name,
                    z.any().refine(fileValidation, {
                      message:
                        "Invalid file. Please upload an image file (JPEG, PNG, GIF) with a size not more than 5MB.",
                    }),
                  ];
                // Add more cases as needed
                default:
                  return [field.type, z.any()]; // Default validation if no specific type matches
              }
            })
          )
        );

  const defaultValues =
    isLoading || subForms === undefined
      ? {}
      : Object.entries(
          subForms.map((field) => {
            switch (field.type) {
              case "business name":
              case "objectives":
                return [field.name, []];
              case "document upload":
                return [field.name, undefined];
              default:
                return [field.name, ""];
            }
          })
        );

  return {
    schema,
    defaultValues,
  };
};
