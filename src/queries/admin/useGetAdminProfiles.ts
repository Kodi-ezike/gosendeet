import { getProfiles, getSingleProfile } from "@/services/adminProfiles";
import { useQuery } from "@tanstack/react-query";

export const useGetProfiles = (page: number, size: number, userStatus: string, role: string, search:string) => {
  const query = useQuery({
    queryKey: ["profiles", page, size, userStatus, role, search],
    queryFn: () => getProfiles(page, size, userStatus, role, search ),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};

export const useGetSingleProfile = (id: string) => {
  const query = useQuery({
    queryKey: ["single_profile", id],
    queryFn: () => getSingleProfile(id),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};