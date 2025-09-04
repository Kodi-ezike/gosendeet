import { getAllBookings, getBookingsById } from "@/services/bookings";
import { useQuery } from "@tanstack/react-query";

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

export const useGetAllBookings = (page:number) => {
  const query = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => getAllBookings(page),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
    refetchUserData: query.refetch,
  };
};
