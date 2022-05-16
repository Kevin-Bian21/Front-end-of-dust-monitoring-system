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
    path: '/dust-chart/line-chart',
    //   access: 'canAdmin',
    //routes: [{ exact: true }],
  },
  {
    path: '/dust-chart',
    component: './monitor/dust-chart',
    name: 'panel',
    icon: 'icon-jianshi-monitoring',
    //   access: 'canAdmin',
    //routes: [{ exact: true }],
  },
  {
    path: '/system-data/environment-data',
    name: 'monitorData',
    icon: 'icon-shuju',
    component: './Welcome',
  },
  {
    path: '/system-data/logging-data',
    name: 'loggingData',
    icon: 'smile',
    access: 'canAdmin',
    access: 'canSuperAdmin',
    component: './Welcome',
  },
  {
    name: 'list.table-list',
    icon: 'icon-yonghuguanli',
    path: '/list',
    access: 'canSuperAdmin',
    component: './table/tableList',
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
    redirect: '/dust-chart',
  },
  {
    component: './404',
  },
];
