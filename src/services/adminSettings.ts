import { api } from "./axios";

export const createServiceLevel = async (data: any) => {
  try {
    const res = await api.post(`/service-levels`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const getServiceLevel = async () => {
  try {
    const res = await api.get(`/service-levels`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const updateServiceLevel = async (id: string, data: any) => {
  try {
    const res = await api.put(`/service-levels/${id}`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const deleteServiceLevel = async (id: string) => {
  try {
    const res = await api.delete(`/service-levels/${id}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};



export const createPickupOptions = async (data: any) => {
  try {
    const res = await api.post(`/pickup-options`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const getPickupOptions = async () => {
  try {
    const res = await api.get(`/pickup-options`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const updatePickupOptions = async (id: string, data: any) => {
  try {
    const res = await api.put(`/pickup-options/${id}`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const deletePickupOptions = async (id: string) => {
  try {
    const res = await api.delete(`/pickup-options/${id}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};



export const createCoverageArea = async (data: any) => {
  try {
    const res = await api.post(`/coverage-areas`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const getCoverageArea = async () => {
  try {
    const res = await api.get(`/coverage-areas`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const updateCoverageArea = async (id: string, data: any) => {
  try {
    const res = await api.put(`/coverage-areas/${id}`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const deleteCoverageArea = async (id: string) => {
  try {
    const res = await api.delete(`/coverage-areas/${id}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};