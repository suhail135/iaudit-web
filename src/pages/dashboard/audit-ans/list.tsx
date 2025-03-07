import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AuditListView } from 'src/sections/audit-ans/view';

// ----------------------------------------------------------------------

const metadata = { title: `Product list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AuditListView />
    </>
  );
}
