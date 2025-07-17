import { api } from "./axios";

export const createCompany = async (data: any) => {
  try {
    const res = await api.post(`/companies`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const getCompanyList = async (page: number, size: number, companyStatus: string, serviceLevelId: string, search:string) => {
  try {
    const res = await api.get(`/companies?page=${page}&size=${size}&status=${companyStatus}&serviceLevelId=${serviceLevelId}&search=${search}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};


export const getSingleCompany = async (id: string) => {
  try {
    const res = await api.get(`/companies/${id}`);
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

export const getCompanyServices = async (id: string) => {
  try {
    const res = await api.get(`/company-services?companyId=${id}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const deleteCompanyServices = async (id: string) => {
  try {
    const res = await api.delete(`/company-services/${id}`,);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const updateCompanyServices = async (id: string, data: any) => {
  try {
    const res = await api.put(`/company-services/${id}`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const createCompanyPricing = async (id: string, data: any) => {
  try {
    const res = await api.post(`/company-services/${id}/delivery-pricing`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const updateCompanyPricing = async (id: string, pricingId: string, data: any) => {
  try {
    const res = await api.put(`/company-services/${id}/delivery-pricing/${pricingId}`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const getCompanyPricing = async (id: string) => {
  try {
    const res = await api.get(`/company-services/${id}/delivery-pricing`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const deleteCompanyPricing = async (id: string, pricingId: string) => {
  try {
    const res = await api.delete(`/company-services/${id}/delivery-pricing/${pricingId}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};