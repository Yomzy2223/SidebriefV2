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
  compulsory: boolean;
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
  requestId: string;
  form: TFormQACreate;
};

export type deleteProductQAPayload = {
  requestFormId: string;
};

export type updateProductQAPayload = {
  requestFormId: string;
  form: TFormQACreate;
};
