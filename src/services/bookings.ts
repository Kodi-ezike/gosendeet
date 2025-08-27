import { api } from "./axios";

export const getBookingsById = async (id: string) => {
  try {
    const res = await api.get(`/bookings/${id}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};