import { axios, rootType, errorType } from "../index";
import {
	productType,
	saveProductQAPayload,
	productQAType,
	addServiceToProductPayload,
	createProductPayload,
} from "./types";

export const createNewProduct = (payload: createProductPayload) =>
	axios.post<rootType<productType>>("/productRequest", payload);

export const saveProductQA = ({ productId, form }: saveProductQAPayload) =>
	axios.post<rootType<productQAType[]>>(
		`/productRequest/form/${productId}`,
		form
	);

export const getproductQA = ({
	productId,
}: {
	productId: string | undefined;
}) => axios.get<rootType<productQAType[]>>(`/productRequest/form/${productId}`);

export const addServiceToProduct = ({
	productId,
	serviceId,
}: addServiceToProductPayload) =>
	axios.post<rootType<productType>>("/product/serviceId", {
		serviceId,
		productId,
	});

export const getProduct = ({ productId }: { productId: string }) =>
	axios.get<rootType<productType>>(`/productRequest/${productId}`);
