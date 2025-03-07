// ----------------------------------------------------------------------

import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axiosInstance, { fetcher, endpoints, swrOptions } from 'src/utils/axios';

import type { IMembershipItem } from '../types/membership';

type MembershipData = {
  data: IMembershipItem[];
};

export function useGetMemberships() {
  const url = endpoints.memberships.list;

  const { data, isLoading, error, isValidating } = useSWR<MembershipData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      memberships: data?.data || [],
      membershipsLoading: isLoading,
      membershipsError: error,
      membershipsValidating: isValidating,
      membershipsEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createMembership(membershipData: any) {
  const data = membershipData;
  const result = await axiosInstance.post(endpoints.memberships.new, data);

  mutate(
    `${endpoints.memberships.list}`,
    (currentData) => {
      const currentEvents: MembershipData[] = currentData?.data;

      const newData = [...currentEvents, result.data.data];

      return { ...currentData, data: newData };
    },
    false
  );
}
