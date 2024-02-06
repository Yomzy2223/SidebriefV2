export type productType = {
	id: string;
	email: string | null;
	address: string | null;
	paid: boolean;
	completed: boolean;
	status: string;
	currentState: string;
	createdAt: string;
	updatedAt: string;
	serviceId: string | null;
	userId: string;
	productQA: any[]; // You might want to replace `any` with a more specific type if possible
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
