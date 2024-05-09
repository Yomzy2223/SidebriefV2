import { TFormCFields } from "../service/types";

export type TProductForm = TFormCFields & {
  productId: string;
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
  otherExpectedRequest: string[];
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
