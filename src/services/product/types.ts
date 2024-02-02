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
