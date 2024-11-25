import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TemplateView } from 'src/sections/audit-template/view';
import { useGetSingleTemplate } from 'src/sections/audit-template/api/template';

// ----------------------------------------------------------------------

const metadata = { title: `Audit Template Edit | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const { template, templateLoading } = useGetSingleTemplate(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {!templateLoading && <TemplateView currentAuditTemplate={template} />}
    </>
  );
}
