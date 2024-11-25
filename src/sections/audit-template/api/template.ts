// ----------------------------------------------------------------------

import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

// import type { IUser } from '../type/users';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
//  "success": true,
//   "message": "template Found",
//   "data":
type AuditTemplateData = {
  succsess: boolean;
  message: string;
  data: any;
  status: number;
};

// type UserData = {
//   data: IUser[];
// };

// type UserDataSingle = {
//   data: IUser;
// };

// export function useGetUsers() {
//   const url = endpoints.users.list;

//   const { data, isLoading, error, isValidating } = useSWR<UserData>(url, fetcher, swrOptions);

//   const memoizedValue = useMemo(
//     () => ({
//       users: data?.data || [],
//       usersLoading: isLoading,
//       usersError: error,
//       usersValidating: isValidating,
//       usersEmpty: !isLoading && !data?.data.length,
//     }),
//     [data?.data, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

export async function createTemplate(membershipData: any) {
  const data = membershipData;
  const result = await axiosInstance.post(endpoints.template.new, data);

  // mutate(
  //   `${endpoints.users.list}`,
  //   (currentData) => {
  //     console.log('currentDataSSSSS', currentData, result.data.data);

  //     const currentEvents: UserData[] = currentData?.data;

  //     const newData = [...currentEvents, result.data.data];

  //     return { ...currentData, data: newData };
  //   },
  //   false
  // );
}

export async function updateTemplate(membershipData: any) {
  const data = membershipData;
  const result = await axiosInstance.put(endpoints.template.edit(membershipData.id), data);

  return result;
}
// export async function updateUser(id: string, membershipData: any) {
//   const data = membershipData;
//   const result = await axiosInstance.put(endpoints.users.edit(id), data);

//   mutate(
//     `${endpoints.users.list}`,
//     (currentData) => {
//       const currentEvents: UserData[] = currentData?.data;

//       const newData = currentEvents.map((item: any) => {
//         if (item.id === id) {
//           return result.data.data;
//         }
//         return item;
//       });

//       return { ...currentData, data: newData };
//     },
//     false
//   );
//   mutate(
//     `${endpoints.users.edit(id)}`,
//     (currentData) => ({ ...currentData, data: result.data.data }),
//     false
//   );
// }

export function useSearchAuditTemplates(query: string) {
  const url = query ? [endpoints.template.list, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<AuditTemplateData>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.data || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetAuditTemplates() {
  const url = endpoints.template.list;

  const { data, isLoading, error, isValidating } = useSWR<AuditTemplateData>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      posts: data?.data || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetSingleTemplate(id: string) {
  const url = endpoints.template.details(id);

  const { data, isLoading, error, isValidating } = useSWR<AuditTemplateData>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      template: data?.data,
      templateLoading: isLoading,
      templateError: error,
      templateValidating: isValidating,
      templateEmpty: !isLoading && !data?.data,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
