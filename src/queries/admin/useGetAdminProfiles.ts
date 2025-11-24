import {
  getLoginHistory,
  getProfiles,
  getProfileStats,
  getSingleProfile,
} from "@/services/adminProfiles";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetProfiles = (
  page: number,
  size: number,
  userStatus: string,
  role: string,
  search: string,
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<any>
) => {
  const query = useQuery({
    queryKey: [
      "profiles",
      page,
      size,
      userStatus,
      role,
      search,
      startDate,
      endDate,
    ],
    queryFn: () =>
      getProfiles(page, size, userStatus, role, search, startDate, endDate),
    ...options, // spread options last to allow overriding defaults
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

export const useGetLoginHistory = (
  id: string,
  startDate: string,
  endDate: string,
  page: number
) => {
  const query = useQuery({
    queryKey: ["login_history", id, startDate, endDate, page],
    queryFn: () => getLoginHistory(id, startDate, endDate, page),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};

export const useGetProfileStats = () => {
  const query = useQuery({
    queryKey: ["profile_stats"],
    queryFn: () => getProfileStats(),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};
