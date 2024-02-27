// initialize axios
import defaultAxios, { AxiosError } from "axios";

export const axios = defaultAxios.create({
	baseURL: "https://h2rwx2fbhm.us-east-1.awsapprunner.com",
	headers: {
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTkwMTRmLTRkNWYtNDc3MS05YzZlLThlNTZkM2FmZDgxOSIsImlhdCI6MTcwODk2NTYxOCwiZXhwIjoxNzEwMTc1MjE4fQ.8EsQmlj4aoxh3ZRvh1fD50xNMs-xKm6ewP2AlFYln3Y",
	},
});

export default axios;

export type rootType<T> = {
	message: string;
	data: T;
};

export type errorType = AxiosError;
