import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SitesEditView } from 'src/sections/sites/view';

// ----------------------------------------------------------------------

const metadata = { title: `Product edit | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SitesEditView />
    </>
  );
}
