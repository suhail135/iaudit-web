import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProductCreateView } from 'src/sections/product/view';
import { SitesCreateView } from 'src/sections/sites/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new product | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SitesCreateView />
    </>
  );
}
