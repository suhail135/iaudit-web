import { useLocation } from 'react-router';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useGetSingleTemplate } from 'src/sections/audit-template/api/template';

// ----------------------------------------------------------------------

export function AuditCreateView() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const {
    template: NewData,
    templateEmpty,
    templateLoading,
  } = useGetSingleTemplate(searchParams.get('template') as string);
  console.log(NewData, 'NewData');

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new Audit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Audit', href: paths.dashboard.audit.root },
          { name: 'New Audit' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* <AuditAnsView currentAuditTemplate={NewData} /> */}
    </DashboardContent>
  );
}
