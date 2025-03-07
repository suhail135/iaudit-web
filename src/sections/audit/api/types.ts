export interface IAudit {
  id: string;
  name: string;
  company: string;
  site: string;
  start_date: string;
  expected_end_date: string;
  auditor_signed: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  templates: {
    id: string;
    name: string;
    description: string;
    is_audit: boolean;
    published: string;
    createdAt: string;
    updatedAt: string;
  };
}
