import type { IProductItem } from 'src/types/product';

import { useParams } from 'react-router';

import { DashboardContent } from 'src/layouts/dashboard';

import { useGetSingleAudit } from '../api/audit';
import { AuditFillPage } from '../sites-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  product?: IProductItem;
};

export function AuditAnsView({ product }: Props) {
  const { id } = useParams();

  const { audit, auditLoading } = useGetSingleAudit(id as string);

  return (
    <DashboardContent>
      {/* <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Audits', href: paths.dashboard.auditAns.root },
          { name: audit?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      /> */}
      {!auditLoading && audit && <AuditFillPage currentAuditTemplate={audit} />}
    </DashboardContent>
  );
}
