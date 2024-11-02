import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { createMembership } from './api/membership';

import type { IMembershipItem } from './types/membership';

// ----------------------------------------------------------------------

export type NewMembershipSchemaType = zod.infer<typeof NewMembershipSchema>;

export const NewMembershipSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  user_limit: zod.number().min(1, { message: 'User limit is required!' }),
  site_limit: zod.number().min(1, { message: 'Site limit is required!' }),
  audit_limit: zod.number().min(1, { message: 'Audit limit is required!' }),
  membership_type: zod.string().min(1, { message: 'Membership type is required!' }),
  no_days: zod.number().min(1, { message: 'No of days is required!' }),
});

// ----------------------------------------------------------------------

type Props = {
  currentMembership?: IMembershipItem;
};

export function MembershipNewEditForm({ currentMembership }: Props) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: currentMembership?.name || '',
      user_limit: currentMembership?.user_limit || 1,
      site_limit: currentMembership?.site_limit || 1,
      audit_limit: currentMembership?.audit_limit || 1,
      membership_type: currentMembership?.membership_type || '',
      no_days: currentMembership?.no_days || 1,
    }),
    [currentMembership]
  );

  const methods = useForm<NewMembershipSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewMembershipSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createMembership(data);
      reset();
      toast.success(currentMembership ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.membership.root);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="name" label="Membership name" />
              <Field.Text type="number" name="user_limit" label="User limit" />
              <Field.Text type="number" name="site_limit" label="Site limit" />
              <Field.Text type="number" name="audit_limit" label="Audit limit" />
              <Field.Text name="membership_type" label="Membership type" />
              <Field.Text type="number" name="no_days" label="No of days" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentMembership ? 'Create user' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
