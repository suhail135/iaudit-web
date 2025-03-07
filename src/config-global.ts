import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  s3Assets: string;
  serverUrl: string;
  assetsDir: string;
  auth: {
    method: 'jwt';
    skip: boolean;
    redirectPath: string;
  };
  mapboxApiKey: string;
  AUDIT_USER: string;
  COMPANY_ADMIN: string;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'IAudit',
  appVersion: packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? '',
  s3Assets: 'https://iaudit.s3.ap-south-1.amazonaws.com/',
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.dashboard.root,
  },
  /**
   * Mapbox
   */
  mapboxApiKey: import.meta.env.VITE_MAPBOX_API_KEY ?? '',
  AUDIT_USER: '77f1588a-06f3-4447-b00a-fbe56e76fa4a',
  COMPANY_ADMIN: 'bfd329f4-fe7f-4031-8f04-da70b900e800',
};
