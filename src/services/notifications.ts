import { api } from "./axios";

export const getAllNotifications = async (page:number) => {
  try {
    const res = await api.get(`/notifications?page=${page}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const updateNotificationStatus = async (data: any) => {
  try {
    const res = await api.put(`/notifications?status=read`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const deleteNotifications = async (data: any) => {
  try {
    const res = await api.delete(`/notifications`, {data});
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};