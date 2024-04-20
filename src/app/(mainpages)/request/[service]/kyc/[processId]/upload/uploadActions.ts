import { useGetRequestQA } from "@/services/productQA";
import { IForm, IFormQA, ISubForm } from "@/services/productQA/types";
import { useCallback } from "react";

export const useUploadActions = ({ persons, forms }: { persons: IFormQA[]; forms: IForm[] }) => {
  const withDocument = useCallback(() => {
    const uploads: {
      title: string;
      isPerson: boolean;
      personType?: string;
      docs: ISubForm[];
    }[] = [];

    const isContainDocument = (form: IForm) =>
      form.productSubForm.some(
        (subForm) => subForm.type === "document upload" || subForm.type === "document template"
      );

    const allDocuments = (subForms: ISubForm[]) => {
      return subForms
        .map((subForm) => {
          if (subForm.type === "document upload" || subForm.type === "document template") {
            return subForm;
          } else return;
        })
        .filter((subForm): subForm is ISubForm => subForm !== undefined);
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
  }, [persons, forms]);

  function getForm(selected: number): IForm {
    const selectedForm = withDocument()[selected - 1];

    let form: IForm;

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

  function checkAllUploaded(productQA: IFormQA[]): boolean {
    const allUploaded: boolean[] = withDocument().map((doc, index) => {
      const form = {
        ...getForm(index + 1),
        title: "document upload",
        description: doc.title,
      };

      let prevFormstates = productQA.filter((el) => el.title === form.title);

      if (form.title === "document upload") {
        prevFormstates = productQA.filter(
          (el) => el.description === form.description && form.title === "document upload"
        );
      }
      const formState = prevFormstates[0];

      console.log(formState);

      if (formState === undefined) return false;

      for (let i = 0; i < doc.docs.length; i++) {
        const el = doc.docs[i];
        const docState = formState.subForm.find((state) => {
          return state.question === el.question;
        });

        if (el.type === "document template") {
          return true; // this is temporary
          // TODO: remove later
        }

        if (!docState || !docState.fileLink) {
          return false;
        }
      }

      return true;
    });

    console.log(allUploaded);

    return !allUploaded.includes(false);
  }

  return { withDocument, getForm, checkAllUploaded };
};
