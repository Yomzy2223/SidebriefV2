import { TBusinessData } from "../business/types";
import type { TProduct } from "../service/types";

export type TProductRequest = {
  id: string;
  paid: boolean;
  status: "PENDING" | "SUBMITTED" | "ASSIGNED" | "REJECTED" | "COMPLETED";
  currentState: "SERVICEFORM" | "PAYMENT";
  partnerInCharge: string;
  isDeprecated: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  submittedAt: string;
  assignedAt: string;
  businessId: string;
  productId: string;
  requestQA: TFormQAGet[];
  product: TProduct;
  business: TBusinessData;
};

export type TFormQACreate = {
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
  isGeneral: boolean;
  subForm: TSubformQACreate[];
};

export type TFormQAGet = TFormQACreate & {
  id: string;
  requestId: string;
  createdAt: string;
  updatedAt: string;
};

export type TSubformQACreate = {
  question: string;
  answer: string[];
  type: string;
  compulsory: true;
  file: {
    name: string;
    link: string;
    size: string;
    type: string;
  };
};

export type TSubformQAGet = TSubformQACreate & {
  id: string;
};

export type FileType = {
  name: string;
  size?: string;
  link: string;
  type: string;
};

export type saveProductQAPayload = {
  productId: string;
  form: TFormQACreate;
};

export type deleteProductQAPayload = {
  requestFormId: string;
};

export type updateProductQAPayload = {
  requestFormId: string;
  form: TFormQACreate;
};
