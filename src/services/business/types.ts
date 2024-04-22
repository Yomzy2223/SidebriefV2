export type createProcessPayload = {
  userId: string;
  productId: string;
};

export type ProductRequest = {
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

export type ProcessData = {
  id: string;
  businessName: string | null;
  isDeprecated: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  // businessId: string;
  productRequest: ProductRequest[];
};

export type BusinessDataType = {
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
