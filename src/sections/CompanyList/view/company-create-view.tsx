import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CompanyNewEditForm } from '../company-new-edit-form';

// ----------------------------------------------------------------------

export function CompanyCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new Company"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Companies', href: paths.dashboard.user.root },
          { name: 'New ' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CompanyNewEditForm />
    </DashboardContent>
  );
}
