// ----------------------------------------------------------------------

import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axiosInstance, { fetcher, endpoints, swrOptions } from 'src/utils/axios';

import type { IUser } from '../type/users';

type UserData = {
  data: IUser[];
};

type UserDataSingle = {
  data: IUser;
};

export function useGetUsers() {
  const url = endpoints.users.list;

  const { data, isLoading, error, isValidating } = useSWR<UserData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      users: data?.data || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetSingleUser(id: string) {
  const url = endpoints.users.details(id);

  const { data, isLoading, error, isValidating } = useSWR<UserDataSingle>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      users: data?.data,
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.data,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createUser(membershipData: any) {
  const data = membershipData;
  const result = await axiosInstance.post(endpoints.users.new, data);

  mutate(
    `${endpoints.users.list}`,
    (currentData) => {
      console.log('currentDataSSSSS', currentData, result.data.data);

      const currentEvents: UserData[] = currentData?.data;

      const newData = [...currentEvents, result.data.data];

      return { ...currentData, data: newData };
    },
    false
  );
}

export async function updateUser(id: string, membershipData: any) {
  const data = membershipData;

  const result = await axiosInstance.put(endpoints.users.edit(id), data);

  mutate(
    `${endpoints.users.list}`,
    (currentData) => {
      const currentEvents: UserData[] = currentData?.data;

      const newData = currentEvents.map((item: any) => {
        if (item.id === id) {
          return result.data.data;
        }
        return item;
      });

      return { ...currentData, data: newData };
    },
    false
  );
  mutate(
    `${endpoints.users.edit(id)}`,
    (currentData) => ({ ...currentData, data: result.data.data }),
    false
  );
}
