"use client";

import RequestForm from "@/components/form/requestForm.tsx";
import { useGetServiceForms } from "@/services/service";
import { useParams } from "next/navigation";
import React from "react";

const Info = () => {
  const { serviceId } = useParams();

  const serviceFormsRes = useGetServiceForms(serviceId.toString());
  const serviceForms = serviceFormsRes.data?.data?.data || [];

  return <RequestForm forms={serviceForms} />;
};

export default Info;
