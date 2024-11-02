// ----------------------------------------------------------------------

import type { IDateValue } from 'src/types/common';

export type IProductFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

export type IProductTableFilters = {
  stock: string[];
  publish: string[];
};

export type IProductReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  postedAt: IDateValue;
  isPurchased: boolean;
  attachments?: string[];
};

export type IMembershipItem = {
  id: string;
  name: string;
  user_limit: number;
  site_limit: number;
  audit_limit: number;
  membership_type: string;
  no_days: number;
  createdAt: string;
  updatedAt: string;
};
