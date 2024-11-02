import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { MembershipNewEditForm } from '../mebership-new-edit-form';

// ----------------------------------------------------------------------

export function MembershipCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a Membership"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Memberships', href: paths.dashboard.user.root },
          { name: 'New ' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <MembershipNewEditForm />
    </DashboardContent>
  );
}
