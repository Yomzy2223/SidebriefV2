export type serviceType = {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
};

export type serviceFormType = {
	id: string;
	title: string;
	description: string;
	type: string;
	compulsory: boolean;
	createdAt: string;
	updatedAt: string;
	serviceCategoryId: string;
};

export type serviceFormSubFormType = {
	id: string;
	question: string;
	type: string;
	options: string[];
	compulsory: boolean;
	createdAt: string;
	updatedAt: string;
	formId: string;
};

export type countryType = {
	id: string;
	name: string;
	iso: string;
	currency: string;
	code: string;
	flagUrl: string;
};
