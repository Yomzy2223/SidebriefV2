import { axios, rootType } from "../index";
import { productType } from "./types";

export const createNewProduct = ({ userId }: { userId: string }) =>
	axios.post<rootType<productType>>("/product", { userId: userId });
