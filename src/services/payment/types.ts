export type PaymentPayload = {
  email: string;
  currency: string;
  amount: string;
  card_number: string;
  card_pin?: string;
  cvv: string;
  expiry_month: string;
  expiry_year: string;
  account_bank?: string;
  type: string;
  productId: string;
  requestId: string;
};

export type createPaymentIntentPayload = {
  amount: number;
  email: string;
  requestId: string;
};

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    references: string;
  };
}
