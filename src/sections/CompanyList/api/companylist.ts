// ----------------------------------------------------------------------

import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints, swrOptions } from 'src/utils/axios';

import type { CompanyResponse, ICompanySingleResponse } from './type';

export function useGetCompanies() {
  const url = endpoints.company.list;

  const { data, isLoading, error, isValidating } = useSWR<CompanyResponse>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      companies: data?.data || [],
      companiesLoading: isLoading,
      companiesError: error,
      companiesValidating: isValidating,
      companiesEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetSingleCompany(id: string) {
  const url = endpoints.company.details(id);

  const { data, isLoading, error, isValidating } = useSWR<ICompanySingleResponse>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      company: data?.data,
      companyLoading: isLoading,
      companyError: error,
      companyValidating: isValidating,
      companyEmpty: !isLoading && !data?.data,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createCompany(membershipData: any) {
  const data = membershipData;
  const result = await axiosInstance.post(endpoints.company.new, data);

  return result;
}

export async function updateCompany(membershipData: any, id: string) {
  const data = membershipData;
  const result = await axiosInstance.put(endpoints.company.edit(id), data);

  return result;
}
