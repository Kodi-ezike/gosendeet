import { api } from "./axios";

export const getBookingsById = async (id: string) => {
  try {
    const res = await api.get(`/bookings/${id}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};

export const getAllBookings = async ({
  page,
  bookingStatus,
  packageTypeId,
  companyId,
  senderId,
  search,
}: {
  page: number;
  bookingStatus?: string;
  packageTypeId?: string;
  companyId?: string;
  senderId?: string;
  search?: string;
}
) => {
  try {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    if (bookingStatus) params.append("status", bookingStatus);
    if (packageTypeId) params.append("packageTypeId", packageTypeId);
    if (companyId) params.append("companyId", companyId);
    if (senderId) params.append("senderId", senderId);
    if (search) params.append("searchTerm", search);

    const res = await api.get(`/bookings?${params.toString()}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};


export const getBookingStats = async ({
  companyId,
  senderId,
}: {
  companyId?: string;
  senderId?: string;
}) => {
  try {

    const params = new URLSearchParams();

    if (companyId) params.append("companyId", companyId);
    if (senderId) params.append("senderId", senderId);

    const res = await api.get(`/bookings/stats?${params.toString()}`);
    return res.data;
  } catch (error: any) {
    throw error?.response?.data || { message: error.message };
  }
};
