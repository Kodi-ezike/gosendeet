import { api } from "./axios";

export const createCompany = async (data: any) => {
  try {
    const res = await api.post(`/companies`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const createCompanyServices = async (data: any) => {
  try {
    const res = await api.post(`/company-services`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};