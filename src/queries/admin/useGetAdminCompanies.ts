import { getCompanyList, getCompanyPricing, getCompanyServices } from "@/services/companies";
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

export const useGetCompanyList = (page: number, size: number, companyStatus: string, serviceLevelId: string, search:string) => {
  const query = useQuery({
    queryKey: ["companies",],
    queryFn: () => getCompanyList(page, size, companyStatus, serviceLevelId, search ),
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

