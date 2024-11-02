// {
//           "id": "aa286d4d-1479-4b41-92a2-ee12c00a10f4",
//         "firstName": "IAduit",
//         "lastName": "Admin",
//         "email": "admin@gmail.com",
//         "password": "$2b$12$r2ePmVAOV58NWSanxzJkAO9GH/XH068MdRrQqchwVvWCXr7lR/Pmi",
//         "roleId": "f9adfadc-4ece-4839-96d2-d5a9130bb4d6",
//         "membershipId": "a9a5d92f-6231-4c0b-814e-14c1a3eccb37",
//         "updatedAt": "2024-11-02T12:31:36.196Z",
//         "createdAt": "2024-11-02T12:31:36.196Z",
//         "phone_number": null,
//         "country": null,
//         "state": null,
//         "city": null,
//         "address": null,
//         "zip_code": null,
//         "company_role": null,
//         "logo": null,
//         "timezone": null,
//         "verified": false,
//         "isActive": true
// }

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
  membershipId: string;
  updatedAt: string;
  createdAt: string;
  phone_number: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zip_code: string;
  company_role: string;
  logo: string;
  timezone: string;
  verified: boolean;
  isActive: boolean;
  status: string;
  company: string;
};
