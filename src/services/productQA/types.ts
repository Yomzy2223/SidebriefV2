import { TFieldTypes } from "../service/types";

type IFormQA<ISubForm> = {
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
  isGeneral: boolean;
  subForm: ISubForm[];
};

export type TFormQACreate = IFormQA<TSubformQACreate>;

export type TFormQAGet = IFormQA<TSubformQAGet> & {
  id: string;
  requestId: string;
  createdAt: string;
  updatedAt: string;
  formId: string;
};

export type TSubformQACreate = {
  question: string;
  answer: string[];
  type: TFieldTypes;
  compulsory: boolean;
  fileName: string;
  fileLink: string;
  fileType: string;
  fileSize: string;
};

export type TSubformQAGet = TSubformQACreate & {
  id: string;
  fileLink: string;
  fileName: string;
  fileSize: string;
  fileType: string;
};

export type FileType = {
  name: string;
  size?: string;
  link: string;
  type: string;
};

export type saveRequestQAPayload = {
  requestId: string;
  formId: string;
  form: TFormQACreate;
};

export type deleteRequestQAPayload = {
  requestFormId: string;
};

export type updateRequestQAPayload = {
  requestFormId: string;
  form: TFormQACreate;
};

export type multipleQASubFormsPayload = {
  formId: string;
  form: {
    subForm: TSubformQACreate[];
  };
};

export type TBusinessInfoCreate = {
  rcNumber?: number;
  companyName?: string;
  companyEmail?: string;
  companyType?: string;
  branchAddress?: string;
  city?: string;
  classification?: string;
  headOfficeAddress?: string;
  lga?: string;
  affiliates?: number;
  shareCapital?: string;
  state?: string;
  status?: string;
};

export type TBusinessInfoGet = {
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
  state: string;
  status: string;
  isDeprecated: false;
  createdAt: string;
  updatedAt: string;
  userId: string;
};
