import { api } from "./axios";

export const uploadImage = async (imageBase64: string, name?: string) => {
  try {
    const res = await api.post(`/documents/upload`, {
      image: imageBase64,
      name: name || `package-type-${Date.now()}`,
      expiration: undefined, // No expiration
    });
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};
