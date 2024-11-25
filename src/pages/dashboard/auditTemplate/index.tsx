import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TemplateView } from 'src/sections/audit-template/view';

// ----------------------------------------------------------------------

const metadata = { title: `Audit Template | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TemplateView />
    </>
  );
}
