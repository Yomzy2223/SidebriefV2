// initialize axios
import defaultAxios, { AxiosError } from "axios";

export const axios = defaultAxios.create({
	baseURL: "https://h2rwx2fbhm.us-east-1.awsapprunner.com",
	headers: {
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTkwMTRmLTRkNWYtNDc3MS05YzZlLThlNTZkM2FmZDgxOSIsImlhdCI6MTcwODcwNTc2MCwiZXhwIjoxNzA5OTE1MzYwfQ.-Nps8QB-tkDN2obnILxaEbxEsg5k5VxiCEr-gFbKVwc",
	},
});

export default axios;

export type rootType<T> = {
	message: string;
	data: T;
};

export type errorType = AxiosError;
