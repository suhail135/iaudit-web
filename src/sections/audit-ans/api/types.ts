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

export interface IAnswer {
  id: string;
  display_no: number;
  audit_findings: string;
  possible_root_cause: string | null;
  audit_evidence: string | null;
  opportunities: string | null;
  score: string;
  geo_location: string | null;
  createdAt: string;
  updatedAt: string;
  questionID: string;
  userId: string;
}

export interface IQuestion {
  id: string;
  display_number: number;
  name: string;
  sectionId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  answer: IAnswer | null;
}

export interface ISection {
  id: string;
  name: string;
  description: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
  questions: IQuestion[];
}

export interface ITemplate {
  id: string;
  name: string;
  description: string;
  is_audit: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  sections: ISection[];
}

export interface IAuditData {
  id: string;
  name: string;
  company: string;
  site: string;
  start_date: string;
  expected_end_date: string;
  auditor_signed: string;
  templateId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  companyId: string | null;
  templates: ITemplate;
}

export interface AuditResponse {
  success: boolean;
  message: string;
  data: IAuditData;
  statusCode: number;
}
