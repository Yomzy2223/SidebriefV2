import { sluggify } from "@/lib/utils";
import { useGetServiceForms } from "@/services/service";
import { TSubForm } from "@/services/service/types";
import { useParams, useSearchParams } from "next/navigation";

export const useActions = ({ info }: { info?: TSubForm[] }) => {
  const { serviceId } = useParams();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";

  const serviceFormsRes = useGetServiceForms(serviceId.toString());
  const serviceForms = serviceFormsRes.data?.data?.data || [];

  const formInfo = info?.map((field) => {
    const value = "values[sluggify(field.question)]";
    const rValue = `!isFileType(value) ? value : ""`;
    return {
      name: sluggify(field.question),
      type: field.type,
      id: field.id,
      label: field.question,
      selectOptions: [],
      value: rValue,
    };
  })!;

  const submitFormHandler = () => {};

  return { serviceForms, productId, formInfo, submitFormHandler };
};
