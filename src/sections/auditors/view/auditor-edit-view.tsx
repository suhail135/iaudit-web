import type { IProductItem } from 'src/types/product';

import { useParams } from 'react-router';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useGetSingleAuditor } from '../api/auditor';
import { AuditorNewEditForm } from '../sites-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  product?: IProductItem;
};

export function AuditorEditView({ product }: Props) {
  const { id } = useParams();

  const { site, siteLoading } = useGetSingleAuditor(id as string);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Product', href: paths.dashboard.product.root },
          { name: product?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      {!siteLoading && <AuditorNewEditForm currentUser={site as any} />}
    </DashboardContent>
  );
}
