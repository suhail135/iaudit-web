import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  membership: icon('ic-membership'),
  companies: icon('ic-companies'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      { title: 'App', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: 'Analytics', path: paths.dashboard.general.analytics, icon: ICONS.analytics },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'User',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        // children: [
        //   { title: 'Profile', path: paths.dashboard.user.root },
        //   { title: 'Cards', path: paths.dashboard.user.cards },
        //   { title: 'List', path: paths.dashboard.user.list },
        //   { title: 'Create', path: paths.dashboard.user.new },
        //   { title: 'Edit', path: paths.dashboard.user.demo.edit },
        //   { title: 'Account', path: paths.dashboard.user.account },
        // ],
      },

      {
        title: 'Memberships',
        path: paths.dashboard.membership.root,
        icon: ICONS.membership,
        // children: [{ title: 'List', path: paths.dashboard.membership.root }],
      },
      {
        title: 'Audits Templates',
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'List', path: paths.dashboard.invoice.root },
          { title: 'Details', path: paths.dashboard.invoice.demo.details },
          { title: 'Create', path: paths.dashboard.invoice.new },
          { title: 'Edit', path: paths.dashboard.invoice.demo.edit },
        ],
      },
    ],
  },
];

export const navDataCompanyAdmin = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [{ title: 'App', path: paths.dashboard.root, icon: ICONS.dashboard }],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'Companies',
        path: paths.dashboard.companyList.root,
        icon: ICONS.companies,
        children: [
          { title: 'List', path: paths.dashboard.companyList.list },
          { title: 'Create', path: paths.dashboard.companyList.new },
        ],
      },
      {
        title: 'Sites',
        path: paths.dashboard.product.root,
        icon: ICONS.product,
        children: [
          { title: 'List', path: paths.dashboard.product.root },
          { title: 'Details', path: paths.dashboard.product.demo.details },
          { title: 'Create', path: paths.dashboard.product.new },
          { title: 'Edit', path: paths.dashboard.product.demo.edit },
        ],
      },
      {
        title: 'Audits Templates',
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'List', path: paths.dashboard.invoice.root },
          { title: 'Details', path: paths.dashboard.invoice.demo.details },
          { title: 'Create', path: paths.dashboard.invoice.new },
          { title: 'Edit', path: paths.dashboard.invoice.demo.edit },
        ],
      },
      {
        title: 'Audits',
        path: paths.dashboard.post.root,
        icon: ICONS.blog,
        children: [
          { title: 'List', path: paths.dashboard.post.root },
          { title: 'Details', path: paths.dashboard.post.demo.details },
          { title: 'Create', path: paths.dashboard.post.new },
          { title: 'Edit', path: paths.dashboard.post.demo.edit },
        ],
      },
      {
        title: 'Auditors',
        path: paths.dashboard.job.root,
        icon: ICONS.job,
        children: [
          { title: 'List', path: paths.dashboard.job.root },
          { title: 'Details', path: paths.dashboard.job.demo.details },
          { title: 'Create', path: paths.dashboard.job.new },
          { title: 'Edit', path: paths.dashboard.job.demo.edit },
        ],
      },
    ],
  },
];
