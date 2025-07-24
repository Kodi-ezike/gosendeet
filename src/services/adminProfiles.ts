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
