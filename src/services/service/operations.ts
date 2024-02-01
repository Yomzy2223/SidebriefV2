import { axios, rootType } from "../index";

type serviceType = {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
};

export const getServices = ({}: {}) =>
	axios.get<rootType<serviceType[]>>("/services");
