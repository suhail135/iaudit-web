import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CompanyListView } from 'src/sections/CompanyList/view';

// ----------------------------------------------------------------------

const metadata = { title: `User list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CompanyListView />
    </>
  );
}
