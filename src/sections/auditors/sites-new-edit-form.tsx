import { z as zod } from 'zod';
import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';
import { uploadFiles } from 'src/utils/fileupload';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { createAuditor, updateAuditor } from './api/auditor';
import { useGetMemberships } from '../memberships/api/membership';

import type { IUser } from '../user/type/users';

// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  firstName: zod.string().min(1, { message: 'First Name is required!' }),
  lastName: zod.string().min(1, { message: 'Last Name is required!' }),

  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod.string().min(1, { message: 'Password is required!' }),
  logo: schemaHelper.file({ message: { required_error: 'Avatar is required!' } }).optional(),
  phone_number: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  country: schemaHelper.objectOrNull<string | null>({
    message: { required_error: 'Country is required!' },
  }),
  state: zod.string().min(1, { message: 'State is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  zip_code: zod.string().min(1, { message: 'Zip code is required!' }),
  company_role: zod.string().min(1, { message: 'Company Role is required!' }),
  timezone: zod.string().min(1, { message: 'Timezone is required!' }),
  verified: zod.boolean(),
  isActive: zod.boolean(),
  // roleId: zod.string().min(1, { message: 'Role ID is required!' }),
  membershipId: zod.string().min(1, { message: 'Membership ID is required!' }),
  status: zod.string(),
  company: zod.string().min(1, { message: 'Company is required!' }),
});

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUser;
};

const USER_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'banned', label: 'Banned' },
  { value: 'rejected', label: 'Rejected' },
];

export function AuditorNewEditForm({ currentUser }: Props) {
  const router = useRouter();

  const { memberships } = useGetMemberships();

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      password: currentUser?.password || '',
      phone_number: currentUser?.phone_number || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      address: currentUser?.address || '',
      zip_code: currentUser?.zip_code || '',
      company_role: currentUser?.company_role || '',
      logo: `${CONFIG.s3Assets}${currentUser?.logo}` || '',
      timezone: currentUser?.timezone || '',
      verified: currentUser?.verified || false,
      isActive: currentUser?.isActive || false,
      membershipId: currentUser?.membershipId || '',
      company: currentUser?.company || '',
      status: currentUser?.status || '',
    }),
    [currentUser]
  );

  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
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
      if (currentUser) {
        if (typeof data.logo === 'string') {
          delete data.logo;
          await updateAuditor(currentUser.id, {
            ...data,
            roleId: CONFIG.AUDIT_USER,
            id: currentUser.id,
          });
        } else {
          await uploadFiles([data.logo], 'user_logo', async (fileDetails: any) => {
            if (fileDetails && Object.values(fileDetails)[0]) {
              await updateAuditor(currentUser.id, {
                ...data,
                id: currentUser.id,
                roleId: CONFIG.AUDIT_USER,
                logo: (Object.values(fileDetails)[0] as { fields: { key: string } }).fields.key,
              });
            }
          });
        }
        toast.success('Update success!');
        router.push(paths.dashboard.auditor.list);
      } else if (typeof data.logo === 'string') {
        delete data.logo;
        await createAuditor({
          ...data,
          roleId: CONFIG.AUDIT_USER,
        });
        toast.success('Create success!');
        router.push(paths.dashboard.auditor.list);
      } else {
        await uploadFiles([data.logo], 'user_logo', async (fileDetails: any) => {
          if (fileDetails && Object.values(fileDetails)[0]) {
            await createAuditor({
              ...data,
              roleId: CONFIG.AUDIT_USER,
              logo: (Object.values(fileDetails)[0] as { fields: { key: string } }).fields.key,
            });
            toast.success('Create success!');
            router.push(paths.dashboard.auditor.list);
          }
        });
      }
      reset();
      toast.success(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.auditor.list);
    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong!');
      }
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="logo"
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
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{
                  mx: 0,
                  mb: 3,
                  width: 1,
                  justifyContent: 'space-between',
                }}
              />
            )}

            <Field.Switch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

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
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="firstName" label="First name" />
              <Field.Text name="lastName" label="Last name" />
              <Field.Text name="email" label="Email address" />
              <Field.Text name="password" label="Password" />
              <Field.Text name="phone_number" label="Phone number" />
              <Field.CountrySelect
                fullWidth
                name="country"
                label="Country"
                placeholder="Choose a country"
              />
              <Field.Text name="state" label="State" />
              <Field.Text name="city" label="City" />
              <Field.Text name="address" label="Address" />
              <Field.Text name="zip_code" label="Zip code" />
              <Field.Text name="company" label="Company" />
              <Field.Text name="company_role" label="Company role" />
              <Field.Text name="timezone" label="Timezone" />
              <Field.Select name="status" label="Status ">
                {USER_STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Field.Select>

              {/* <Field.Text  name="roleId" label="Role ID" /> */}
              <Field.Select name="membershipId" label="Membership ">
                {memberships.map((membership) => (
                  <MenuItem key={membership.id} value={membership.id}>
                    {membership.name}
                  </MenuItem>
                ))}
              </Field.Select>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create user' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
