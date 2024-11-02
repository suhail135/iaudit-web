import type { IUserItem } from 'src/types/user';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserNewEditForm } from '../company-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  user?: IUserItem;
};

export function CompanyDetailsView({ user: currentUser }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Company Details"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: currentUser?.name }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserNewEditForm currentUser={currentUser} />
    </DashboardContent>
  );
}
