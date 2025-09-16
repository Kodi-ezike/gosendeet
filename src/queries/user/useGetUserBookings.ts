import {
  getAllBookings,
  getBookingsById,
  getBookingStats,
} from "@/services/bookings";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetBookingsById = (id: string) => {
  const query = useQuery({
    queryKey: ["bookings", id],
    queryFn: () => getBookingsById(id),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
    refetchUserData: query.refetch,
  };
};

export const useGetAllBookings = ( params: {
    page: number;
    bookingStatus?: string;
    packageTypeId?: string;
    companyId?: string;
    search?: string;
  },
  options?: UseQueryOptions<any>

) => {
  const query = useQuery({
    queryKey: ["bookings", params],
    queryFn: () =>
      getAllBookings(params),
     ...options, // spread options last to allow overriding defaults
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
    refetchUserData: query.refetch,
  };
};

export const useGetBookingsStats = () => {
  const query = useQuery({
    queryKey: ["booking_stats"],
    queryFn: () => getBookingStats(),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};
