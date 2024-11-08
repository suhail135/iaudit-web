import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SplitResetPasswordView } from 'src/auth/view/jwt/split-reset-password-view';

// ----------------------------------------------------------------------

const metadata = { title: `Reset password | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SplitResetPasswordView />
    </>
  );
}
