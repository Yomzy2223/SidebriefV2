import { axios, rootType, errorType } from "../index";
import { productType, saveProductQAPayload } from "./types";

export const createNewProduct = ({ userId }: { userId: string }) =>
	axios.post<rootType<productType>>("/product", {
		userId,
	});

export const saveProductQA = ({ productId, form }: saveProductQAPayload) =>
	axios.post<rootType<{}>>(`/product/form/${productId}`, { form });
