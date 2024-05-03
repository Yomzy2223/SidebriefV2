"use client";

import RequestDocForm from "@/components/form/requestDocForm";
import RequestForm from "@/components/form/requestForm";
import { useGetProductForms } from "@/services/service";
import { useSearchParams } from "next/navigation";
import React from "react";
import RequestWrapper from "../wrapper";

const Forms = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const productFormsRes = useGetProductForms(productId as string);
  const productForms = productFormsRes.data?.data?.data || [];

  return (
    <RequestWrapper>
      <RequestForm forms={productForms} step="STEP 4" />
      <RequestDocForm forms={productForms?.filter((el) => el.type.toLowerCase() === "person")} />
    </RequestWrapper>
  );
};

export default Forms;
