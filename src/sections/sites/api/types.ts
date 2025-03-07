export interface ISiteData {
  id: string;
  name: string;
  description: string;
  companyId: string;
  updatedAt: string;
  createdAt: string;
  companies: {
    id: string;
    name: string;
    description: string;
    userId: string;
    address: string;
    contact: string;
    logo_url: string;
    createdAt: string;
    updatedAt: string;
  };
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
