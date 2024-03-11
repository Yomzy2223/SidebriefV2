export interface IRequest {
  userId: string;
  productId: string;
}

export interface IService {
  name: string;
  description: string;
}

export interface IServiceFull extends IService {
  id: string;
}

export interface IServiceForm {
  title: string;
  description: string;
  type: string;
  compulsory: boolean;
}

export interface IServiceSubForm {
  question: string;
  type: string;
  options?: string[];
  compulsory: boolean;
  fileName?: string;
  fileDescription?: string;
  fileLink?: string;
  fileType?: string;
  documentType?: string;
}

export interface IProduct {
  name: string;
  description: string;
  country: string;
  currency: string;
  amount: number;
  timeline: string;
  feature: string[];
}

export interface IProductFull extends IProduct {
  id?: string;
}

export interface ICountryServiceProduct {
  serviceId: string;
  country: string;
}

export interface ICountry {
  name: string;
  code: string;
  iso: string;
  currency: string;
}
