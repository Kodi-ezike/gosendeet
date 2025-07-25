import { api } from "./axios";

export const getProfiles = async (
  page: number,
  size: number,
  userStatus: string,
  role: string,
  search: string
) => {
  try {
    const res = await api.get(
      `/users?page=${page}&size=${size}&status=${userStatus}&role=${role}&search=${search}`
    );
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const getSingleProfile = async (id: string) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const updateProfileStatus = async (userId: string, status: string) => {
  try {
    const res = await api.post(`users/status?userId=${userId}&status=${status}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const getLoginHistory = async (id: string) => {
  try {
    const res = await api.get(`/login-history?userId=${id}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const getProfileStats = async () => {
  try {
    const res = await api.get(`/users/stats/data`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};