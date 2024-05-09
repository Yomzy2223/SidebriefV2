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

export type TFormCFields = {
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
  | "business name"
  | "checkbox"
  | "countries-operation"
  | "countries-all"
  | "document template"
  | "document upload"
  | "select"
  | "email"
  | "paragraph"
  | "objectives"
  | "phone number"
  | "promocode"
  | "multiple choice"
  | "short answer";
