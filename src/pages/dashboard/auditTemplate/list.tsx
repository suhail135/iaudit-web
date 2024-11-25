import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AuditTemplateListView } from 'src/sections/audit-template/view/audit-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Audit Template  List | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AuditTemplateListView />
    </>
  );
}
