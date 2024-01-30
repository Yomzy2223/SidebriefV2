// initialize axios
import defaultAxios from "axios";

export const axios = defaultAxios.create({
	baseURL: "https://h2rwx2fbhm.us-east-1.awsapprunner.com",
});

export default axios;
