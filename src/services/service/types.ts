export type serviceType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type serviceFormType = {
  id: string;
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
  createdAt: string;
  updatedAt: string;
  serviceId: string;
  subForm: serviceFormSubFormType[];
};

export type serviceFormSubFormType = {
  id: string;
  question: string;
  type: string;
  options: string[];
  compulsory: boolean;
  createdAt: string;
  updatedAt: string;
  formId: string;
};

export type countryType = {
  id: string;
  name: string;
  iso: string;
  currency: string;
  code: string;
  flagUrl: string;
};

export type serviceProductType = {
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
