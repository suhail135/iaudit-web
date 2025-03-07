import type { IUser } from 'src/sections/user/type/users';

import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints, swrOptions } from 'src/utils/axios';

import type { ISiteSingleResponse } from './types';

type UserData = {
  data: IUser[];
};

type UserDataSingle = {
  data: IUser;
};

export function useGetAuditors() {
  const url = endpoints.auditors.list;

  const { data, isLoading, error, isValidating } = useSWR<UserData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      users: data?.data || [],
      usersLoading: isLoading,
      sitesError: error,
      sitesValidating: isValidating,
      sitesEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// use single site

export function useGetSingleAuditor(id: string) {
  const url = endpoints.auditors.details(id);

  const { data, isLoading, error, isValidating } = useSWR<ISiteSingleResponse>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      site: data?.data,
      siteLoading: isLoading,
      siteError: error,
      siteValidating: isValidating,
      siteEmpty: !isLoading && !data?.data,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// create site

export async function createAuditor(siteData: any) {
  const data = siteData;
  const result = await axiosInstance.post(endpoints.auditors.new, data);
  return result.data;
}

// update site

export async function updateAuditor(id: string, siteData: any) {
  const data = siteData;
  const result = await axiosInstance.put(endpoints.auditors.edit(id), data);
  return result.data;
}
