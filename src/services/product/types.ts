import type { serviceProductType } from "../service/types";

export type productType = {
  id: string;
  email: string | null;
  address: string | null;
  paid: boolean;
  completed: boolean;
  currentState: "START";
  status: "pending";
  createdAt: string;
  updatedAt: string;
  productId: string | null;
  userId: string;
  productQA: productQAType[];
  product: serviceProductType;
};

export type FileType = {
  name: string;
  size?: string;
  link: string;
  type: string;
};

export type SubFormProfile = {
  question: string;
  answer: string[];
  type: string;
  compulsory: boolean;
};

export type FormItem = {
  id?: string;
  question: string;
  answer: string[];
  type: string;
  compulsory: boolean;
  isGeneral: boolean;
  // subForm: boolean;
  // profile: SubFormProfile[];
  file?: FileType;
};

export type saveProductQAPayload = {
  productId: string;
  formId: string;
  form: {
    title: string;
    description: string;
    type: string;
    compulsory: boolean;
    isGeneral: boolean;
    subForm: FormItem[];
  };
};

export type updateProductQAPayload = {
  requestFormId: string;
  form: {
    title: string;
    description: string;
    type: string;
    compulsory: boolean;
    isGeneral: boolean;
    subForm: FormItem[];
  };
};

export type deleteProductQAPayload = {
  requestFormId: string;
};

export type productQAType = {
  compulsory: boolean;
  createdAt: string;
  description: string;
  id: string;
  isDeprecated: boolean;
  isGeneral: boolean;
  requestId: string;
  subForm: SubformQAType[];
  title: string;
  type: string;
  updatedAt: string;
  formId: string;
};

export type addServiceToProductPayload = {
  serviceId: string;
  productId: string;
};

export type SubformQAType = {
  answer: string[];
  compulsory: boolean;
  fileLink: string | null;
  fileName: string | null;
  fileType: string | null;
  id: string;
  //   isDeprecated: boolean;
  question: string;
  requestQAId: string;
  type: string;
};

export type productSubFormType = {
  id: string;
  question: string;
  type: string;
  options: string[];
  formId: string;
  compulsory: true;
  fileName: string | null;
  fileLink: string | null;
  fileType: string | null;
  fileSize: string | null;
  allowOther: boolean;
  documentType: string;
  dependsOn: {
    field: string;
    options: string[];
  };
  createdAt: string;
  updatedAt: string;
  isDeprecated: boolean;
};

export type productFormType = {
  id: string;
  title: string;
  type: string;
  description: string;
  compulsory: boolean;
  createdAt: string;
  isDeprecated: boolean;
  updatedAt: string;
  productId: string;
  productSubForm: productSubFormType[];
};

export interface BusinessType {
  id: string;
  rcNumber: string | null;
  companyName: string | null;
  companyType: string | null;
  registrationDate: string;
  branchAddress: string | null;
  companyEmail: string | null;
  city: string | null;
  classification: string | null;
  headOfficeAddress: string | null;
  lga: string | null;
  affiliates: string[] | null;
  shareCapital: number | null;
  shareCapitalInWords: string | null;
  state: string | null;
  status: string;
  isDeprecated: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface NewProductType {
  id: string;
  paid: boolean;
  completed: boolean;
  status: string;
  currentState: string;
  partnerInCharge: string | null;
  createdAt: string;
  isDeprecated: boolean;
  updatedAt: string;
  completedAt: string | null;
  submittedAt: string | null;
  assignedAt: string | null;
  businessId: string;
  productId: string;
  requestQA: productQAType[]; // You might want to specify the type for this array
  product: serviceProductType;
  business: BusinessType;
}
