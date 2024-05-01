export type serviceType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  label: string;
  priority: number;
};

export type countryType = {
  id: string;
  name: string;
  iso: string;
  currency: string;
  code: string;
  flagUrl: string;
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  country: string;
  currency: string;
  amount: number;
  timeline: string;
  feature: string[];
  serviceId: string;
  // hasShares: boolean;
  // hasAgent: boolean;
  // hasOwner: boolean;
  // hasController: boolean;
  // controllerIsCalled: string | null;
  // ownerIsCalled: string | null;
  // agentIsCalled: string | null;
  // createdAt: string;
  // updatedAt: string;
  // serviceCategoryId: string;
};

type TFormCFields = {
  id: string;
  title: string;
  type: string;
  description: string;
  compulsory: boolean;
  createdAt: string;
  isDeprecated: boolean;
  updatedAt: string;
  subForm: TSubForm[];
};

export type TProductForm = TFormCFields & {
  productId: string;
};

export type TServiceForm = TFormCFields & {
  serviceId: string;
};

export type TSubForm = {
  id: string;
  question: string;
  type: TFieldTypes;
  options: string[];
  formId: string;
  compulsory: boolean;
  fileName: string;
  fileLink: string;
  fileType: string;
  fileSize: string;
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

export type TFieldTypes =
  | "text"
  | "password"
  | "address"
  | "business name"
  | "checkbox"
  | "countries-operation"
  | "countries-all"
  | "document template"
  | "document upload"
  | "select"
  | "email"
  | "email address"
  | "paragraph"
  | "objectives"
  | "phone number"
  | "promocode"
  | "multiple choice"
  | "short answer";
