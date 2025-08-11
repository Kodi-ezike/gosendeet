import { api, authApi } from "./axios";

export const userDetails = async (id: string) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const getQuotes = async (data: any) => {
  try {
    const res = await authApi.post(`/quotes`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const updateUserProfile = async (id: string, data: any) => {
  try {
    const res = await api.put(`users/${id}`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const createBooking = async (data: any) => {
  try {
    const res = await api.post(`/bookings`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const payForBooking = async (bookingId: string, successUrl: string, errorUrl: string) => {
  try {
    const res = await api.post(`/booking/payments/initialize?bookingId=${bookingId}&successUrl=${successUrl}&errorUrl=${errorUrl}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};