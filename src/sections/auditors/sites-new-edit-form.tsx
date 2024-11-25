import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { createSite, updateSite } from './api/auditor';
import { useGetCompanies } from '../CompanyList/api/companylist';

import type { ISiteData } from './api/types';

// ----------------------------------------------------------------------

export type NewAuditorSchemaType = zod.infer<typeof NewAuditorSchema>;

// "firstName":"s1",
//   "lastName":"user",
//   "email":"admin@gmail.com",
//   "password":"password",
//   "roleId":"09ca657e-f86a-4017-94db-38f874c1ca13",
//   "membershipId":"5710d298-dab2-43a8-b145-d4cf2e56632b"
export const NewAuditorSchema = zod.object({});

// ----------------------------------------------------------------------

type Props = {
  currentProduct?: ISiteData;
};

export function ProductNewEditForm({ currentProduct }: Props) {
  const router = useRouter();

  const { companies } = useGetCompanies();

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
    }),
    [currentProduct]
  );

  const methods = useForm<NewAuditorSchemaType>({
    resolver: zodResolver(NewAuditorSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentProduct) {
        await updateSite(
          {
            ...data,
            id: currentProduct.id,
          },
          currentProduct.id
        );
      } else {
        await createSite(data);
      }
      reset();
      toast.success(currentProduct ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.sites.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Name" fullWidth />

        <Field.Text name="description" label="Description" multiline rows={3} fullWidth />

        <Field.Select name="companyId" label="Company">
          {companies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </Field.Select>
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Publish"
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentProduct ? 'Create product' : 'Save changes'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto' }}>
        {renderDetails}

        {renderActions}
      </Stack>
    </Form>
  );
}
