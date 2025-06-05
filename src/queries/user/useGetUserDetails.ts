import { userDetails } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetails = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: () => userDetails(),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};
