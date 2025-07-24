import {
  getCompanyList,
  getCompanyPricing,
  getCompanyServices,
  getCompanyStats,
  getSingleCompany,
} from "@/services/companies";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyServices = (id: string) => {
  const query = useQuery({
    queryKey: ["company_services", id],
    queryFn: () => getCompanyServices(id),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};

export const useGetCompanyList = (
  page: number,
  size: number,
  companyStatus: string,
  serviceLevelId: string,
  search: string
) => {
  const query = useQuery({
    queryKey: ["companies", page, size, companyStatus, serviceLevelId, search],
    queryFn: () =>
      getCompanyList(page, size, companyStatus, serviceLevelId, search),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};

export const useGetCompanyPricing = (id: string) => {
  const query = useQuery({
    queryKey: ["company_pricing", id],
    queryFn: () => getCompanyPricing(id),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};

export const useGetSingleCompany = (id: string) => {
  const query = useQuery({
    queryKey: ["single_company", id],
    queryFn: () => getSingleCompany(id),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};

export const useGetCompanyStats = () => {
  const query = useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanyStats(),
  });
  return {
    isLoading: query.isPending,
    isSuccess: query.isSuccess,
    isError: query.isError,
    data: query.data,
  };
};
