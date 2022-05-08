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
            component: './user/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
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
    name: 'list.table-list',
    icon: 'icon-yonghuguanli',
    path: '/list',
    component: './table/tableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
