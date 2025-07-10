import { getServiceLevel } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

export const useGetServiceLevel = () => {
  const query = useQuery({
    queryKey: ["service_level"],
    queryFn: () => getServiceLevel(),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};
