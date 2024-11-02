import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { MembershipListView } from 'src/sections/memberships/view';

// ----------------------------------------------------------------------

const metadata = { title: `Order list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MembershipListView />
    </>
  );
}
