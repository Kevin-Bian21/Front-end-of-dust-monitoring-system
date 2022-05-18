export default [
  //  { path: '/', component: '../layouts/BaseLayout' },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   access: 'canSuperAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    name: 'lineChart',
    hideInMenu: true,
    component: './monitor/line-chart',
    path: '/monitor/lineChartWithIn24h',
    //   access: 'canAdmin',
    //routes: [{ exact: true }],
  },
  {
    path: '/monitor',
    component: './monitor/dust-chart',
    name: 'panel',
    icon: 'icon-jianshi-monitoring',
    //   access: 'canAdmin',
    //routes: [{ exact: true }],
  },
  {
    path: '/system/data/environment',
    name: 'monitorData',
    icon: 'icon-shuju',
    component: './table/envDataList',
  },
  {
    path: '/system/data/logging',
    name: 'loggingData',
    icon: 'icon-logger',
    access: 'canAdmin',
    component: './table/loggingDataList',
  },
  {
    name: 'list.table-list',
    icon: 'icon-yonghuguanli',
    path: '/admin/manger',
    access: 'canAdmin',
    component: './table/userManger',
  },

  {
    name: 'account-center',
    icon: 'icon-icon03',
    path: '/account/center',
    component: './404',
  },

  // {
  //   path: '/system-data',
  //   component: './monitor/dust-chart',
  //   name: 'panel',
  //   icon: 'icon-jianshi-monitoring',
  //   //   access: 'canAdmin',
  //   //routes: [{ exact: true }],
  // },

  {
    path: '/',
    redirect: '/monitor',
  },
  {
    component: './404',
  },
];
