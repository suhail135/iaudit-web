import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl, withCredentials: true });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/auth/me',
    signIn: '/auth/login',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  memberships: {
    list: '/membership',
    new: '/membership',
    edit: (id: string) => `/membership/${id}`,
  },
  users: {
    list: '/users',
    new: '/users',
    edit: (id: string) => `/users/${id}`,
    details: (id: string) => `/users/${id}`,
  },
  template: {
    list: '/template',
    new: '/template',
    edit: (id: string) => `/template/${id}`,
    details: (id: string) => `/template/${id}`,
  },
  company: {
    list: '/company',
    new: '/company',
    edit: (id: string) => `/company/${id}`,
    details: (id: string) => `/company/${id}`,
  },
  sites: {
    list: '/site',
    new: '/site',
    edit: (id: string) => `/site/${id}`,
    details: (id: string) => `/site/${id}`,
  },
  auditors: {
    list: '/auditor',
    new: '/auditor',
    edit: (id: string) => `/auditor/${id}`,
    details: (id: string) => `/auditor/${id}`,
  },
  audits: {
    list: '/audit',
    auditorAudits: '/audit/AuditsForAuditor',
    new: '/audit',
    edit: (id: string) => `/audit/${id}`,
    details: (id: string) => `/audit/${id}`,
  },
  answer: {
    list: '/answer',
    new: '/answer',
    edit: (id: string) => `/answer/${id}`,
    details: (id: string) => `/answer/${id}`,
  },
};

export const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};
