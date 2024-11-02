import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CompanyCreateView } from 'src/sections/CompanyList/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new user | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CompanyCreateView />
    </>
  );
}
