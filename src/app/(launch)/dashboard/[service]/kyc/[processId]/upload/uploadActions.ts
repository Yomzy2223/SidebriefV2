import { productFormType, productQAType, productSubFormType } from "@/services/product/types";
import { useCallback } from "react";

export const useUploadActions = ({ persons }: { persons: productQAType[] }) => {
  const withDocument = useCallback(
    (forms: productFormType[]) => {
      const uploads: {
        title: string;
        isPerson: boolean;
        personType?: string;
        docs: productSubFormType[];
      }[] = [];

      const isContainDocument = (form: productFormType) =>
        form.productSubForm.some(
          (subForm) => subForm.type === "document upload" || subForm.type === "document template"
        );

      const allDocuments = (subForms: productSubFormType[]) => {
        return subForms
          .map((subForm) => {
            if (subForm.type === "document upload" || subForm.type === "document template") {
              return subForm;
            } else return;
          })
          .filter((subForm): subForm is productSubFormType => subForm !== undefined);
      };

      forms
        .filter((form) => form.type !== "person" && isContainDocument)
        .forEach((form) => {
          uploads.push({
            title: form.title,
            isPerson: false,
            docs: allDocuments(form.productSubForm),
          });
        });

      if (persons) {
        for (let i = 0; i < persons.length; i++) {
          const person = persons[i];
          const form = forms.find((form) => form.title === person.title);
          if (!form) {
            continue;
          }

          if (isContainDocument(form)) {
            uploads.push({
              title: person.subForm[0]?.answer[0],
              isPerson: true,
              personType: person.title,
              docs: allDocuments(form.productSubForm),
            });
          }
        }
      }

      return uploads;
    },
    [persons]
  );

  function getForm(forms: productFormType[], selected: number): productFormType {
    const selectedForm = withDocument(forms)[selected - 1];

    let form: productFormType;

    if (!selectedForm.isPerson) {
      // find by title
      const index = forms.findIndex((form) => form.title === selectedForm.title);
      form = forms[index];
    } else {
      // find by personType
      const index = forms.findIndex((form) => form.title === selectedForm.personType);
      form = forms[index];
    }

    // form.title = "document upload";
    // form.description = selectedForm.title;

    return form;
  }

  return { withDocument, getForm };
};
