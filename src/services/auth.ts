import { api } from "./axios";

export const signup = async (data: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const res = await api.post("/auth/create-account", data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const validateEmail = async (email: string) => {
  try {
    const res = await api.post(`/auth?email=${email}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const resendVerification = async (email: string) => {
  try {
    const res = await api.post(`/auth/resend-verification?email=${email}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await api.post(`/auth/forgot-password?email=${email}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const resetPassword = async ({
  resetToken,
  password,
  confirmPassword,
}: {
  resetToken: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const res = await api.post(
      `/auth/reset-password?resetToken=${resetToken}&newPassword=${password}&confirmPassword=${confirmPassword}`
    );
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const changePassword = async (data: any) => {
  try {
    const res = await api.post(`/security/change-password`, data);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const deleteAccount = async () => {
  try {
    const res = await api.delete(`/security`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const activateAccount = async (status: string) => {
  try {
    const res = await api.post(
      `/security/update-account-status?status=${status}`
    );
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const googleLogin = async () => {
  try {
    const res = await api.post(`/auth/google-login`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};
