import { api } from "./axios";

export const userDetails = async (id: string) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};
