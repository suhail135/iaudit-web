import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AuditorCreateView } from 'src/sections/auditors/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new product | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AuditorCreateView />
    </>
  );
}
