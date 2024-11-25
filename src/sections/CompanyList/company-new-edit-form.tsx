import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';
import { uploadFiles } from 'src/utils/fileupload';

import { CONFIG } from 'src/config-global';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

import { createCompany, updateCompany } from './api/companylist';

import type { ICompanyData } from './api/type';

// ----------------------------------------------------------------------

export type NewCompanySchemaType = zod.infer<typeof NewCompanySchema>;
// {
//     "name": "MyCompany",
//     "description": "test disss",
//     "address":"new Address",
//     "userId":"e8a3e99f-27dc-4bf2-b9ff-64b9a73f712a",
//     "contact": "+917356851153",
//     "logo_url": "https://iaudit.s3.ap-south-1.amazonaws.com/demo-dark.png"
// }

export const NewCompanySchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: zod.string().min(1, { message: 'Description is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  contact: zod.string().min(1, { message: 'Contact is required!' }),
  logo_url: schemaHelper.file({ message: { required_error: 'Image is required!' } }).optional(),
});

// ----------------------------------------------------------------------

type Props = {
  currentUser?: ICompanyData;
};

export function CompanyNewEditForm({ currentUser }: Props) {
  const router = useRouter();

  const { user } = useAuthContext();

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      description: currentUser?.description || '',
      address: currentUser?.address || '',
      contact: currentUser?.contact || '',
      // logo_url: currentUser?.logo_url || '',
      logo_url: `${CONFIG.s3Assets}${currentUser?.logo_url}` || '',
    }),
    [currentUser]
  );

  const methods = useForm<NewCompanySchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewCompanySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        if (data.logo_url && data.logo_url !== currentUser.logo_url) {
          await uploadFiles([data.logo_url], 'company_logo', async (fileDetails: any) => {
            if (fileDetails && Object.values(fileDetails)[0]) {
              await updateCompany(
                {
                  ...data,
                  id: currentUser.id,
                  logo_url: (Object.values(fileDetails)[0] as { fields: { key: string } }).fields
                    .key,
                  userId: user?.id,
                },
                currentUser.id
              );
            }
          });
        } else {
          await updateCompany(
            {
              ...data,
              userId: user?.id,
              id: currentUser.id,
            },
            currentUser.id
          );
        }
      } else {
        console.log('new User');
        if (data.logo_url) {
          await uploadFiles([data.logo_url], 'company_logo', async (fileDetails: any) => {
            if (fileDetails && Object.values(fileDetails)[0]) {
              await createCompany({
                ...data,
                userId: user?.id,
                logo_url: (Object.values(fileDetails)[0] as { fields: { key: string } }).fields.key,
              });
            }
          });
        } else {
          await createCompany({
            ...data,
            userId: user?.id,
          });
        }
      }
      reset();
      toast.success(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.companyList.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="logo_url"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete user
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              mb={3}
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}
            >
              <Field.Text name="name" label="Name" />
            </Box>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="description" label="Description" multiline rows={3} />
              <Field.Text name="address" label="Address" multiline rows={3} />
              <Field.Text name="contact" label="Contact" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create Company' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
