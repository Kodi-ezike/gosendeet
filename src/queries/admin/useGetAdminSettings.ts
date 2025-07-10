import { getPickupOptions, getServiceLevel } from "@/services/adminSettings";
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

export const useGetPickupOptions = () => {
  const query = useQuery({
    queryKey: ["pickup_options"],
    queryFn: () => getPickupOptions(),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};
