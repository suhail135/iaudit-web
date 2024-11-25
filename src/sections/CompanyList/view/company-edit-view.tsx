import { useParams } from 'react-router';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useGetSingleCompany } from '../api/companylist';
import { CompanyNewEditForm } from '../company-new-edit-form';

import type { ICompanyData } from '../api/type';

// ----------------------------------------------------------------------

type Props = {
  user?: ICompanyData;
};

export function CompanyEditView({ user: currentUser }: Props) {
  const { id } = useParams();

  const { company, companyLoading } = useGetSingleCompany(id as string);

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

      {!companyLoading && <CompanyNewEditForm currentUser={company} />}
    </DashboardContent>
  );
}
