import { IFormInput } from "../constants";
import { z } from "zod";
import { UseFormGetValues, UseFormReset, UseFormResetField } from "react-hook-form";
import { sluggify } from "@/lib/utils";
import { TSubForm } from "@/services/service/types";

// export const getDynamicSchema = ({
//   isLoading = false,
//   subForms,
// }: {
//   isLoading?: boolean;
//   subForms?: IFormInput[];
// }) => {
//   const fileValidation = (file: any) => {
//     let hasFile = false;
//     const fileExistsInCloud =
//       file?.fileName && file?.fileLink && file && file?.fileSize && file?.fileType;
//     if (file instanceof File || fileExistsInCloud) hasFile = true;

//     return hasFile;
//   };

//   const schema =
//     isLoading || subForms === undefined
//       ? z.object({})
//       : z.object(
//           Object.fromEntries(
//             subForms?.map((field) => {
//               switch (field.type) {
//                 case "business name":
//                   return field.compulsory
//                     ? [
//                         field.name,
//                         z
//                           .array(
//                             z.string().min(3, "Business/Company must have at least three character")
//                           )
//                           .length(4, "Enter exactly 4 business names"),
//                       ]
//                     : [field.name, z.array(z.string().nullable()).nullable()];

//                 case "checkbox":
//                   return field.compulsory
//                     ? [
//                         field.name,
//                         z
//                           .array(z.string().min(1, "Option must be at least 1 character"))
//                           .length(4, "Select at least one option"),
//                       ]
//                     : [field.name, z.array(z.string().nullable()).nullable()];

//                 case "countries-all":
//                   return field.compulsory
//                     ? [(field.name, z.string().min(1, "Select a country"))]
//                     : [field.name, z.string().nullable()];

//                 case "countries-operation":
//                   return field.compulsory
//                     ? [(field.name, z.string().min(1, "Select a country"))]
//                     : [field.name, z.string().nullable()];

//                 case "document template":
//                   return field.compulsory
//                     ? [
//                         field.name,
//                         z.any().refine(fileValidation, {
//                           message: "Kindly upload a valid file",
//                         }),
//                       ]
//                     : [field.name, z.any().nullable()];

//                 case "document upload":
//                   return field.compulsory
//                     ? [
//                         field.name,
//                         z.any().refine(fileValidation, {
//                           message: "Kindly upload a valid file",
//                         }),
//                       ]
//                     : [field.name, z.any().nullable()];

//                 case "email":
//                   return field.compulsory
//                     ? [field.name, z.string().email().min(1, "Enter email address")]
//                     : [field.name, z.string().email().nullable()];

//                 case "multiple choice":
//                   return field.compulsory
//                     ? [field.name, z.string().min(1, "Select an option")]
//                     : [field.name, z.string().email().nullable()];

//                 case "objectives":
//                   return field.compulsory
//                     ? [
//                         field.name,
//                         z
//                           .array(
//                             z.string().min(3, "An objective should be at least 3 characters long")
//                           )
//                           .min(1, "Select at least one objective")
//                           .max(4, "You can not select more than 4 objective"),
//                       ]
//                     : [field.name, z.array(z.string().nullable()).nullable()];

//                 case "paragraph":
//                   return field.compulsory
//                     ? [
//                         (field.name,
//                         z.string().min(3, "Response must be at least 3 character long")),
//                       ]
//                     : [field.name, z.string().nullable()];

//                 case "phone number":
//                   return field.compulsory
//                     ? [(field.name, z.string().min(8, "Enter a valid phone number"))]
//                     : [field.name, z.string().nullable()];

//                 case "promocode":
//                   return field.compulsory
//                     ? [(field.name, z.string().min(1, "Enter promo code"))]
//                     : [field.name, z.string().nullable()];

//                 case "select":
//                   return field.compulsory
//                     ? [(field.name, z.string().min(1, "Select an option"))]
//                     : [field.name, z.string().nullable()];

//                 case "short answer":
//                   return field.compulsory
//                     ? [(field.name, z.string().min(1, "Enter a valid response"))]
//                     : [field.name, z.string().nullable()];

//                 default:
//                   return [field.type, z.any()];
//               }
//             })
//           )
//         );

//   return { schema };
// };

// export const getDynamicSchema = ({
//   isLoading = false,
//   subForms,
// }: {
//   isLoading?: boolean;
//   subForms?: IFormInput[];
// }) => {
//   const fileValidation = (file: any) => {
//     let hasFile = false;
//     const fileExistsInCloud =
//       file?.fileName && file?.fileLink && file && file?.fileSize && file?.fileType;
//     if (file instanceof File || fileExistsInCloud) hasFile = true;

//     return hasFile;
//   };

//   const schema =
//     isLoading || subForms === undefined
//       ? z.object({})
//       : z.object(
//           Object.fromEntries(
//             subForms.map((field) => {
//               switch (field.type) {
//                 case "business name":
//                   return [
//                     field.name,
//                     z
//                       .array(
//                         z.string().min(3, "Business/Company must have at least three character")
//                       )
//                       .length(4, "Enter exactly 4 business names"),
//                   ];
//                 case "checkbox":
//                   return [
//                     field.name,
//                     z
//                       .array(z.string().min(1, "Option must be at least 1 character"))
//                       .length(4, "Select at least one option"),
//                   ];
//                 case "countries-all":
//                   return [(field.name, z.string().min(1, "Select a country"))];
//                 case "countries-operation":
//                   return [(field.name, z.string().min(1, "Select a country"))];
//                 case "document template":
//                   return [
//                     field.name,
//                     z.any().refine(fileValidation, {
//                       message: "Kindly upload a valid file",
//                     }),
//                   ];
//                 case "document upload":
//                   return [
//                     field.name,
//                     z.any().refine(fileValidation, {
//                       message: "Kindly upload a valid file",
//                     }),
//                   ];
//                 case "email":
//                   return [field.name, z.string().email().min(1, "Enter email address")];
//                 case "multiple choice":
//                   return [field.name, z.string().min(1, "Select an option")];
//                 case "objectives":
//                   return [
//                     field.name,
//                     z
//                       .array(z.string().min(3, "An objective should be at least 3 characters long"))
//                       .min(1, "Select at least one objective")
//                       .max(4, "You can not select more than 4 objective"),
//                   ];
//                 case "paragraph":
//                   return [
//                     (field.name, z.string().min(3, "Response must be at least 3 character long")),
//                   ];
//                 case "phone number":
//                   return [(field.name, z.coerce.number().min(8, "Enter a valid phone number"))];
//                 case "promocode":
//                   return [(field.name, z.string().min(1, "Enter promo code"))];
//                 case "select":
//                   return [(field.name, z.string().min(1, "Select an option"))];
//                 case "short answer":
//                   return [(field.name, z.string().min(1, "Enter a valid response"))];

//                 default:
//                   return [field.type, z.any()];
//               }
//             })
//           )
//         );

//   return { schema };
// };

export const getDynamicSchema = ({
  isLoading = false,
  subForms,
}: {
  isLoading?: boolean;
  subForms?: IFormInput[];
}) => {
  const fileValidation = (file: any) => {
    let hasFile = false;
    const fileExistsInCloud =
      file?.fileName && file?.fileLink && file && file?.fileSize && file?.fileType;
    if (file instanceof File || fileExistsInCloud) hasFile = true;

    return hasFile;
  };

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
                      .array(
                        z.string().min(3, "Business/Company must have at least three character")
                      )
                      .length(4, "Enter exactly 4 business names"),
                  ];
                case "objectives":
                  return [field.name, z.array(z.string()).min(1, "Select business objectives")];
                case "email":
                  return [field.name, z.string().email().min(1, "Enter email address")];
                case "phone number":
                  return [field.name, z.coerce.number().min(1, "Enter phone number")];
                case "short answer":
                  return [field.name, z.string().min(1, "This field is required")];
                case "countries-operation":
                  return [field.name, z.string().min(1, "Select a country")];
                case "countries-all":
                  return [field.name, z.string().min(1, "Select a country")];
                case "select":
                  return [field.name, z.string().min(1, "Select an option")];
                case "document upload":
                  return [
                    field.name,
                    z
                      .any()
                      .refine(fileValidation, {
                        message: "Kindly upload a valid file",
                      })
                      .refine((file) => (file?.size || file?.fileSize) <= 1024 * 1024, {
                        message: "File size must be less than 1MB",
                      }),
                    ,
                  ];
                case "document template":
                  return [
                    field.name,
                    z
                      .any()
                      .refine(fileValidation, {
                        message: "Kindly upload a valid file",
                      })
                      .refine((file) => (file?.size || file?.fileSize) <= 1024 * 1024, {
                        message: "File size must be less than 1MB",
                      }),
                    ,
                  ];
                default:
                  return [field.type, z.any()];
              }
            })
          )
        );

  return { schema };
};

export const getVisibilityStatus = ({
  field,
  getValues,
  fullFormInfo,
}: {
  field: IFormInput;
  getValues: UseFormGetValues<any>;
  fullFormInfo?: TSubForm[];
}) => {
  const dependsField = field?.dependsOn ? field?.dependsOn.field : "";
  let dependsOnQuestion = "";
  let showField = true;

  if (dependsField) {
    const dependsIndex = parseInt(dependsField.split(" ").pop() || "") - 1;
    if (dependsIndex && fullFormInfo) dependsOnQuestion = fullFormInfo[dependsIndex]?.question;
    if (dependsOnQuestion) {
      const currValue = getValues(sluggify(dependsOnQuestion))?.toLowerCase();
      if (field.dependsOn?.options) {
        showField = !!field.dependsOn?.options?.find((el) => el?.toLowerCase() === currValue);
      } else {
        showField = !!currValue;
      }
    }
  }
  return showField;
};

export const resetDependees = ({
  question,
  fullFormInfo,
  resetField,
}: {
  question: string;
  fullFormInfo?: TSubForm[];
  resetField: UseFormResetField<any>;
}) => {
  let fieldIndex: number;

  fullFormInfo?.map((el, i) => {
    const field = sluggify(question);
    if (el.question === question) fieldIndex = i + 1;
  });

  fullFormInfo?.map((el) => {
    if (el.dependsOn.field) {
      const dependsIndex = parseInt(el.dependsOn.field.split(" ").pop() || "") - 1;
      if (dependsIndex === fieldIndex) resetField(sluggify(el.question));
    }
  });
};
