import { api } from "./axios";

const userId = localStorage.getItem("userId")

export const userDetails = async () => {

  try {
    const res = await api.get(`/users/${userId}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};