export type createProcessPayload = {
  userId: string;
  productId: string;
};

export type ProductRequestType = {
  id: string;
  paid: boolean;
  completed: boolean;
  status: string;
  currentState: string;
  partnerInCharge: string | null;
  createdAt: string;
  isDeprecated: boolean;
  updatedAt: string;
  completedAt: string;
  submittedAt: string;
  assignedAt: string;
  businessId: string;
  productId: string;
};

export type ProcessData = {
  id: string;
  businessName: string | null;
  isDeprecated: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  // businessId: string;
  productRequest: ProductRequestType[];
};
