import { axios, rootType, errorType } from "../index";
import {
	productType,
	saveProductQAPayload,
	productQAType,
	addServiceToProductPayload,
	addServiceToProductType,
} from "./types";

export const createNewProduct = ({ userId }: { userId: string }) =>
	axios.post<rootType<productType>>("/product", {
		userId,
	});

export const saveProductQA = ({ productId, form }: saveProductQAPayload) =>
	axios.post<rootType<productQAType[]>>(`/product/form/${productId}`, {
		form,
	});

export const getproductQA = ({
	productId,
}: {
	productId: string | undefined;
}) => axios.get<rootType<productQAType[]>>(`/product/form/${productId}`);

export const addServiceToProduct = ({
	productId,
	serviceId,
}: addServiceToProductPayload) =>
	axios.post<rootType<addServiceToProductType>>("/product/serviceId", {
		serviceId,
		productId,
	});
