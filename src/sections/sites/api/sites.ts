import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints, swrOptions } from 'src/utils/axios';

import type { ISiteResponse, ISiteSingleResponse } from './types';

export function useGetSites() {
  const url = endpoints.sites.list;

  const { data, isLoading, error, isValidating } = useSWR<ISiteResponse>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      sites: data?.data || [],
      sitesLoading: isLoading,
      sitesError: error,
      sitesValidating: isValidating,
      sitesEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// use single site

export function useGetSingleSite(id: string) {
  const url = endpoints.sites.details(id);

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

export async function createSite(siteData: any) {
  const data = siteData;
  const result = await axiosInstance.post(endpoints.sites.new, data);
  return result.data;
}

// update site

export async function updateSite(siteData: any, id: string) {
  const data = siteData;
  const result = await axiosInstance.put(endpoints.sites.edit(id), data);
  return result.data;
}
