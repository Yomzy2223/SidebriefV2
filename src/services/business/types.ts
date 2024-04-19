export type TCreateBusinessPayload = {
  userId: string;
  productId: string;
};

export type TCreateRequestPayload = {
  businessId: string;
  productIds: string[];
};

export type TProductRequest = {
  id: string;
  paid: boolean;
  completed: boolean;
  status: string;
  currentState: string;
  partnerInCharge: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  submittedAt: string;
  processId: string;
  productId: string;
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
