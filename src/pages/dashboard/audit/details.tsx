import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AuditDetailsView } from 'src/sections/audit/view';

// ----------------------------------------------------------------------

const metadata = { title: `Product edit | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AuditDetailsView />
    </>
  );
}
