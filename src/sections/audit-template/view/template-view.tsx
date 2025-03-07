import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack, Button, Divider, Container, CardHeader } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { createTemplate, updateTemplate } from '../api/template';

// ----------------------------------------------------------------------

export type NewAuditTemplateType = zod.infer<typeof NewAuditTemplateSchema>;

export const NewAuditTemplateSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: zod.string().min(1, { message: 'Description is required!' }),
  is_audit: zod.boolean().optional(),
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
          })
        ),
      })
    )
    .min(1, { message: 'Must have at least 1 section!' }),
});

type Props = {
  currentAuditTemplate?: any;
};

export function TemplateView({ currentAuditTemplate }: Props) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      id: currentAuditTemplate?.id || '',
      name: currentAuditTemplate?.name || '',
      description: currentAuditTemplate?.description || '',
      is_audit: false,
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

  const values = watch();

  console.log('values', values);

  const { sections } = values;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(currentAuditTemplate);

      if (currentAuditTemplate) {
        await updateTemplate(data);
        toast.success('Update success!');
      } else {
        const sectionsData = data.sections.map((section: any) => ({
          name: section.name,
          description: section.description || '',
          questions: section.questions.map((question: any, index: number) => ({
            name: question.name,
            description: question.description || '',
            display_number: index + 1,
          })),
        }));
        const templateData = {
          name: data.name,
          description: data.description || '',
          is_audit: data.is_audit,
          sections: sectionsData,
        };

        await createTemplate(templateData);
      }

      reset();
      router.push(paths.dashboard.auditTemplate.root);

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
                          <Field.Text
                            name={`sections.${index}.questions.${questionIndex}.name`}
                            label="Question Title"
                          />
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
    <Container sx={{ my: 5 }}>
      <CustomBreadcrumbs
        heading="Create New Audit Template"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Audit Templates ', href: paths.dashboard.auditTemplate.root },
          { name: 'New Audit Template' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={5} sx={{ mx: 'auto' }}>
          {renderDetails}

          {renderSections}

          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {currentAuditTemplate ? 'Update Template' : 'Create Template'}
          </Button>
        </Stack>
      </Form>
    </Container>
  );
}
