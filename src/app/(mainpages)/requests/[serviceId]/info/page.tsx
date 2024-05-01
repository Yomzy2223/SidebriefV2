"use client";

import RequestForm from "@/components/form/requestForm";
import { useGetServiceForms } from "@/services/service";
import { useParams } from "next/navigation";
import React from "react";
import RequestWrapper from "../wrapper";

const Info = () => {
  const { serviceId } = useParams();

  const serviceFormsRes = useGetServiceForms(serviceId as string);
  const serviceForms = serviceFormsRes.data?.data?.data || [];

  return (
    <RequestWrapper>
      <RequestForm forms={serviceForms} isServiceForm />
    </RequestWrapper>
  );
};

export default Info;
