"use client";

import RequestForm from "@/components/form/requestForm.tsx";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { useGetServiceForms } from "@/services/service";
import { useParams } from "next/navigation";
import React from "react";

const Info = () => {
  const { setQueriesWithPath } = useGlobalFunctions();
  const { serviceId } = useParams();

  const serviceFormsRes = useGetServiceForms(serviceId as string);
  const serviceForms = serviceFormsRes.data?.data?.data || [];

  return <RequestForm forms={serviceForms} isServiceForm />;
};

export default Info;
