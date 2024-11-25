export interface ICompanyData {
  id: string;
  name: string;
  description: string;
  address: string;
  userId: string;
  contact: string;
  logo_url: string;
  updatedAt: string;
  createdAt: string;
}

export interface CompanyResponse {
  success: boolean;
  message: string;
  data: ICompanyData[];
  statusCode: number;
}

export interface ICompanySingleResponse {
  success: boolean;
  message: string;
  data: ICompanyData;
  statusCode: number;
}
