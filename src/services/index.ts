// initialize axios
import defaultAxios, { AxiosError } from "axios";

export const axios = defaultAxios.create({
	baseURL: "https://h2rwx2fbhm.us-east-1.awsapprunner.com",
	headers: {
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmZThlZmFhLTE2MWYtNDU3MC04NDMzLTFjZjg3NzI0MjdjNiIsImlhdCI6MTcwNjk0ODYwOSwiZXhwIjoxNzA4MTU4MjA5fQ.NBq_mDG97vPOjhRZ6L4GMluxtD9ToqoQD7A4E2HRet8",
	},
});

export default axios;

export type rootType<T> = {
	message: string;
	data: T;
};

export type errorType = AxiosError;
