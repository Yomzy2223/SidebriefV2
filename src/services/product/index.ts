import { useMutation, useQuery } from "@tanstack/react-query";
import {
	createNewProduct,
	saveProductQA,
	getproductQA,
	addServiceToProduct,
} from "./operations";
import { saveProductQAPayload, addServiceToProductPayload } from "./types";

export const useCreateNewProduct = () =>
	useMutation({
		mutationFn: ({ userId }: { userId: string }) =>
			createNewProduct({ userId }),
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
