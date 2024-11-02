import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { UserEditView } from 'src/sections/user/view';
import { useGetSingleUser } from 'src/sections/user/api/user';

// ----------------------------------------------------------------------

const metadata = { title: `User edit | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  // const currentUser: any = _userList.find((user) => user.id === id);
  const { users, usersLoading } = useGetSingleUser(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {!usersLoading && <UserEditView user={users} />}
    </>
  );
}
