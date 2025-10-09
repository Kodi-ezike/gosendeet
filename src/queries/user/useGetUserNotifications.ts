import { getAllNotifications } from "@/services/notifications";
import { useQuery } from "@tanstack/react-query";

export const useGetAllNotifications = (page:number) => {
  const query = useQuery({
    queryKey: ["notifications", page],
    queryFn: () => getAllNotifications(page),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
    refetchUserData: query.refetch,
  };
};
