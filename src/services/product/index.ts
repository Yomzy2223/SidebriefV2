import { useMutation } from "@tanstack/react-query";
import { createNewProduct } from "./operations";

export const useCreateNewProduct = () =>
	useMutation({
		mutationFn: ({ userId }: { userId: string }) =>
			createNewProduct({ userId }),
		mutationKey: ["create new product"],
	});
