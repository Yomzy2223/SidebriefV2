import type { serviceProductType } from "../service/types";

export type productType = {
	id: string;
	email: string | null;
	address: string | null;
	paid: boolean;
	completed: boolean;
	currentState: "START";
	status: "pending";
	createdAt: string;
	updatedAt: string;
	serviceId: string | null;
	userId: string;
	productQA: productQAType[];
	service: serviceProductType;
};

export type File = {
	name: string;
	description: string;
	link: string;
	type: string;
};

export type SubFormProfile = {
	question: string;
	answer: string[];
	type: string;
	compulsory: boolean;
};

export type FormItem = {
	question: string;
	answer: string[];
	type: string;
	compulsory: boolean;
	isGeneral: boolean;
	// subForm: boolean;
	// profile: SubFormProfile[];
	file?: File;
};

export type saveProductQAPayload = {
	productId: string;
	form: FormItem[];
};

export type productQAType = {
	id: string;
	question: string;
	answer: string[];
	type: string;
	compulsory: boolean;
	isGeneral: boolean;
	fileName: string | null;
	fileDescription: string | null;
	fileType: string | null;
	fileLink: string | null;
	createdAt: string;
	updatedAt: string;
	productId: string;
};

export type addServiceToProductPayload = {
	serviceId: string;
	productId: string;
};
