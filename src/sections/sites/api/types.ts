export interface ISiteData {
  id: string;
  name: string;
  description: string;
  companyId: string;
  updatedAt: string;
  createdAt: string;
}

export interface ISiteResponse {
  success: boolean;
  message: string;
  data: ISiteData[];
  statusCode: number;
}

export interface ISiteSingleResponse {
  success: boolean;
  message: string;
  data: ISiteData;
  statusCode: number;
}
