import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Button, Divider, MenuItem, CardHeader } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Form, Field } from 'src/components/hook-form';

import { useGetSites } from '../sites/api/sites';
import { useGetAuditors } from '../auditors/api/auditor';
import { createAudit, createTemplate } from './api/audit';
import { useGetCompanies } from '../CompanyList/api/companylist';

// ----------------------------------------------------------------------

export type NewAuditTemplateType = zod.infer<typeof NewAuditTemplateSchema>;
export type NewAuditType = zod.infer<typeof NewAuditTypeSchema>;

export const NewAuditTypeSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string().min(1, { message: 'Name is required!' }),
  company: zod.string().min(1, { message: 'Company is required!' }),
  site: zod.string().min(1, { message: 'Site is required!' }),
  start_date: zod.string().min(1, { message: 'Start Date is required!' }),
  expected_end_date: zod.string().min(1, { message: 'Expected End Date is required!' }),
  auditor_signed: zod.string().min(1, { message: 'Auditor Signed is required!' }),
  templateId: zod.string().min(1, { message: 'Template is required!' }),
});

export const NewAuditTemplateSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: zod.string().min(1, { message: 'Description is required!' }),
  company: zod.string().min(1, { message: 'Company is required!' }),
  site: zod.string().min(1, { message: 'Site is required!' }),
  start_date: zod.string().min(1, { message: 'Start Date is required!' }),
  expected_end_date: zod.string().min(1, { message: 'Expected End Date is required!' }),
  auditor_signed: zod.string().min(1, { message: 'Auditor Signed is required!' }).optional(),
  templateId: zod.string().min(1, { message: 'Template is required!' }).optional(),
  is_audit: zod.boolean().optional(),
  userId: zod.string().min(1, { message: 'User is required!' }).optional(),
  scope: zod.string().min(1, { message: 'Scope is required!' }),
  objective: zod.string().min(1, { message: 'Objective is required!' }),
  sections: zod
    .array(
      zod.object({
        id: zod.string().optional(),
        name: zod.string().min(1, { message: 'Title is required!' }),
        description: zod.string().optional(),
        questions: zod.array(
          zod.object({
            id: zod.string().optional(),
            name: zod.string().min(1, { message: 'Question Title is required!' }),
            description: zod.string().optional(),
            display_number: zod.string().optional(),
            planned_date: zod.string().min(1, { message: 'Planned Date is required!' }),
          })
        ),
      })
    )
    .min(1, { message: 'Must have at least 1 section!' }),
});

type Props = {
  currentAuditTemplate?: any;
};

export function AuditNewEditForm({ currentAuditTemplate }: Props) {
  const router = useRouter();

  const { companies } = useGetCompanies();
  const { sites } = useGetSites();
  const { users } = useGetAuditors();

  const defaultValues = useMemo(
    () => ({
      name: currentAuditTemplate?.name || '',
      description: currentAuditTemplate?.description || '',
      is_audit: true,
      sections: currentAuditTemplate?.sections || [],
    }),
    [currentAuditTemplate]
  );

  const methods = useForm<NewAuditTemplateType>({
    mode: 'all',
    resolver: zodResolver(NewAuditTemplateSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = methods;

  const valuesD = watch();

  console.log('values', valuesD);

  useEffect(() => {
    reset(defaultValues);

    return () => {};
  }, [currentAuditTemplate, defaultValues, reset]);

  const values = watch();

  console.log('values', values);
  console.log('errors', errors);

  const { sections } = values;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const sectionsData = data.sections.map((section: any) => ({
        name: section.name,
        description: section.description || '',
        questions: section.questions.map((question: any, index: number) => ({
          name: question.name,
          description: question.description || '',
          display_number: question.display_number,
          planned_date: question.planned_date,
        })),
      }));
      const templateData = {
        name: data.name,
        description: data.description || '',

        is_audit: true,
        sections: sectionsData,
      };

      const templateResponse = await createTemplate(templateData);

      console.log('templateResponse', templateResponse);

      const auditResponse = await createAudit({
        name: data.name,
        company: data.company,
        site: data.site,
        objective: data.objective || '',
        scope: data.scope || '',
        start_date: data.start_date,
        expected_end_date: data.expected_end_date,
        auditor_signed: true,
        templateId: templateResponse.data.id,
        userId: data.userId,
      });

      console.log('auditResponse', auditResponse);

      reset();
      router.push(paths.dashboard.audit.details(auditResponse.data.id));

      toast.success(currentAuditTemplate ? 'Update success!' : 'Create success!');
    } catch (error) {
      console.error(error);
    }
  });
  const renderDetails = (
    <Card>
      <CardHeader title="Template Details" subheader="Title, short description.." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Audit Name" />
        <Field.Text name="description" label="Description" multiline rows={3} />
        <Field.Text name="scope" label="Scope" multiline rows={3} />
        <Field.Text name="objective" label="Objective" multiline rows={3} />

        <Field.Select
          name="site"
          label="Site"
          onChange={(e) => {
            const singleSite = sites.find((site: any) => site.id === e.target.value);
            if (singleSite) {
              setValue('company', singleSite?.companies.id);
              setValue('site', singleSite?.id);
            }
          }}
        >
          {sites.map((site: any) => (
            <MenuItem key={site.id} value={site.id}>
              {site.name} - {site.companies.name}
            </MenuItem>
          ))}
        </Field.Select>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.DatePicker name="start_date" label="Start Date" />
          <Field.DatePicker name="expected_end_date" label="Expected End Date" />
        </Stack>

        <Field.Select name="userId" label="Auditor Assigned ">
          {users.map((user: any) => (
            <MenuItem key={user.id} value={user.id}>
              {`${user.firstName} ${user.lastName}`} - {user.email}
            </MenuItem>
          ))}
        </Field.Select>
      </Stack>
    </Card>
  );

  const renderSections = (
    <Card>
      <CardHeader
        title="Audit Questions"
        subheader="Add sections to your audit template"
        sx={{ mb: 3 }}
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setValue('sections', [
                ...sections,
                {
                  name: '',
                  description: '',

                  questions: [
                    {
                      name: '',
                      description: '',
                      display_number: '',
                      planned_date: '',
                    },
                  ],
                },
              ]);
            }}
          >
            Add New Section
          </Button>
        }
      />

      <Divider />

      <Stack sx={{ p: 3 }}>
        <Stack spacing={1}>
          {sections.map((section: any, index: number) => (
            <Card key={index} sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <Field.Text
                    name={`sections.${index}.name`}
                    label="Section Title"
                    sx={{ mb: 3 }}
                  />
                }
                sx={{ mb: 1 }}
              />

              <Divider />

              {true && (
                <Stack spacing={1} sx={{ p: 3 }}>
                  {section.questions.map((question: any, questionIndex: number) => (
                    <Card key={questionIndex}>
                      <CardHeader
                        title={
                          <Stack direction={{ xs: 'column', md: 'column' }} spacing={2}>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                              <Field.Text
                                name={`sections.${index}.questions.${questionIndex}.display_number`}
                                label="Question Number"
                              />
                              <Field.DatePicker
                                name={`sections.${index}.questions.${questionIndex}.planned_date`}
                                label="Planned Date"
                              />
                            </Stack>
                            <Field.Text
                              name={`sections.${index}.questions.${questionIndex}.name`}
                              label="Question Title"
                            />
                          </Stack>
                        }
                        subheader={question.description}
                        sx={{ mb: 3 }}
                      />

                      <Divider />
                    </Card>
                  ))}
                  <Stack spacing={3} sx={{ p: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setValue(`sections.${index}.questions`, [
                          ...section.questions,
                          {
                            name: '',
                            description: '',
                          },
                        ]);
                      }}
                    >
                      Add New Question
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Card>
          ))}
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto' }}>
        {renderDetails}

        {renderSections}

        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
          Create Audit Template
        </Button>
      </Stack>
    </Form>
  );
}
