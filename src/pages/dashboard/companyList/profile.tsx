import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CompanyProfileView } from 'src/sections/CompanyList/view';

// ----------------------------------------------------------------------

const metadata = { title: `User profile | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CompanyProfileView />
    </>
  );
}
