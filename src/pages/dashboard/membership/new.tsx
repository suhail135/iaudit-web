import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { MembershipCreateView } from 'src/sections/memberships/view/membership-create-view';

// ----------------------------------------------------------------------

const metadata = { title: `Create Membership | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MembershipCreateView />
    </>
  );
}
