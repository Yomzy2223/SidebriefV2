"use client";

import RequestForm from "@/components/form/requestForm.tsx";
import { useGetProductForms } from "@/services/service";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import RequestWrapper from "../wrapper";

const Forms = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const productFormsRes = useGetProductForms(productId as string);
  const productForms = productFormsRes.data?.data?.data || [];

  console.log(productForms);
  return (
    <RequestWrapper>
      <RequestForm forms={productForms} isServiceForm />
    </RequestWrapper>
  );
};

export default Forms;
