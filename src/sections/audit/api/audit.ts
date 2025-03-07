import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints, swrOptions } from 'src/utils/axios';

import type { IAudit } from './types';

type AuditData = {
  data: IAudit[];
};

type AuditDataSingle = {
  data: IAudit;
};

export function useGetAudits() {
  const url = endpoints.audits.list;

  const { data, isLoading, error, isValidating } = useSWR<AuditData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      audits: data?.data || [],
      auditsLoading: isLoading,
      auditsError: error,
      auditsValidating: isValidating,
      auditsEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// use single site

export function useGetSingleAuditor(id: string) {
  const url = endpoints.auditors.details(id);

  const { data, isLoading, error, isValidating } = useSWR<AuditDataSingle>(
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

export async function createTemplate(membershipData: any) {
  const data = membershipData;
  const result = await axiosInstance.post(endpoints.template.new, data);
  return result.data;
}

export async function updateTemplate(membershipData: any) {
  const data = membershipData;
  const result = await axiosInstance.put(endpoints.template.edit(membershipData.id), data);

  return result;
}

export async function createAudit(auditData: any) {
  const data = auditData;
  const result = await axiosInstance.post(endpoints.audits.new, data);
  return result.data;
}
