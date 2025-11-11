import { useQuery } from "@tanstack/react-query";
import { viewDispatch } from "@/services/dispatchPublic";

export const usePublicDispatch = (token: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["public-dispatch", token],
    queryFn: () => viewDispatch(token),
    enabled: enabled && !!token,
  });
};
