import { useMutation, useQuery } from "@tanstack/react-query";
import {
	createNewProduct,
	saveProductQA,
	getproductQA,
	addServiceToProduct,
	getProduct,
} from "./operations";
import {
	saveProductQAPayload,
	addServiceToProductPayload,
	createProductPayload,
} from "./types";

export const useCreateNewProduct = () =>
	useMutation({
		mutationFn: (payload: createProductPayload) =>
			createNewProduct(payload),
		mutationKey: ["create new product"],
	});

export const useSaveProductQA = () =>
	useMutation({
		mutationKey: ["save product QA"],
		mutationFn: (payload: saveProductQAPayload) => saveProductQA(payload),
	});

export const useGetProductQA = (productId: string | undefined) =>
	useQuery({
		queryKey: ["get product QA", productId],
		queryFn: () => getproductQA({ productId }),
		enabled: !!productId,
	});

export const useAddServiceToProduct = () =>
	useMutation({
		mutationKey: ["add service too product"],
		mutationFn: (payload: addServiceToProductPayload) =>
			addServiceToProduct(payload),
	});

export const useGetProduct = (productId: string) =>
	useQuery({
		queryKey: ["get product by id", productId],
		queryFn: () => getProduct({ productId }),
		enabled: !!productId,
	});
