"use client";

import RequestForm from "@/components/form/requestForm";
import { useGetServiceForms } from "@/services/service";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import RequestWrapper from "../wrapper";

const Info = () => {
  const { serviceId } = useParams();

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";

  const serviceFormsRes = useGetServiceForms(serviceId as string);
  const serviceForms = serviceFormsRes.data?.data?.data || [];

  return (
    <RequestWrapper productId={productId} requestState="SERVICEFORM">
      <RequestForm forms={serviceForms} step="STEP 2" isServiceForm />
    </RequestWrapper>
  );
};

export default Info;
