import { TFormQAGet } from "../productQA/types";
import { TProduct } from "../product/types";

export type TCreateBusinessPayload = {
  userId: string;
  productId: string;
};

export type TCreateRequestPayload = {
  businessId: string;
  productIds: string[];
};

export type TBusinessData = {
  id: string;
  rcNumber: string;
  companyName: string;
  companyType: string;
  registrationDate: string;
  branchAddress: string;
  companyEmail: string;
  city: string;
  classification: string;
  headOfficeAddress: string;
  lga: string;
  affiliates: string;
  shareCapital: string;
  shareCapitalInWords: string;
  state: string;
  status: string;
  isDeprecated: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type TBusinessDataFull = TBusinessData & {
  productRequest: TProductRequest[];
};

export type TCreateRequest = {
  id: string;
  paid: boolean;
  status: TRequestStatus;
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
};

export type TProductRequest = TCreateRequest & {
  requestQA: TFormQAGet[];
  product: TProduct;
  business: TBusinessData;
};

export interface IDocument {
  id: string;
  name: string;
  type: string;
  link: string;
  size: string;
  belongsTo: any;
  isReceived: boolean;
  isApproved: boolean;
  isDeprecated: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  requestId: string;
  requestSubFormId: string;
}

export type TRequestState = "SERVICEFORM" | "PAYMENT" | "PRODUCTFORM" | "REVIEW";
export type TRequestStatus =
  | "PENDING"
  | "SUBMITTED"
  | "ASSIGNED"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED";
