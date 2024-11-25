import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AuditorListView } from 'src/sections/auditors/view';

// ----------------------------------------------------------------------

const metadata = { title: `Product list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AuditorListView />
    </>
  );
}
