import { useMutation } from "@tanstack/react-query";
import { createNewProduct, saveProductQA } from "./operations";
import { saveProductQAPayload } from "./types";

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
