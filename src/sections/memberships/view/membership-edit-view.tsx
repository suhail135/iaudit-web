import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { MembershipNewEditForm } from '../mebership-new-edit-form';

import type { IMembershipItem } from '../types/membership';

// ----------------------------------------------------------------------

type Props = {
  user?: IMembershipItem;
};

export function MembershipEditView({ user: currentUser }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: currentUser?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <MembershipNewEditForm currentMembership={currentUser} />
    </DashboardContent>
  );
}
