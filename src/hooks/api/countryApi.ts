import { Client } from "@/lib/axios";

// Country endpoints
export const getCountry = async (id: string) => {
  const client = await Client();
  return await client.get(`/countries/${id}`);
};

export const getCountries = async () => {
  const client = await Client();
  return await client.get(`/countries`);
};
