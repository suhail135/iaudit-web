import React from 'react';
import { useParams } from 'react-router';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useGetSingleAudit } from 'src/sections/audit-ans/api/audit';

import { AuditSummeryPage } from '../audit-summery';

type Props = {};

export function AuditDetailsView() {
  const { id } = useParams();

  const { audit, auditLoading } = useGetSingleAudit(id as string);

  if (auditLoading) return <LoadingScreen />;

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Audits', href: paths.dashboard.audit.root },
          { name: audit?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {!auditLoading && audit && <AuditSummeryPage currentAuditTemplate={audit} />}
    </DashboardContent>
  );
}
