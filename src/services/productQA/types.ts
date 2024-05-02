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
  type: string;
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
