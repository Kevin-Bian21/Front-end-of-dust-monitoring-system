/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState ?? {};
  return {
    //超级管理员
    canSuperAdmin: currentUser && currentUser.access === 'superAdmin',
    //具有管理员的身份
    canAdmin:
      (currentUser && currentUser.access === 'admin') ||
      (currentUser && currentUser.access === 'superAdmin'),
    //只有管理员身份的话
    canOnlyAdmin: currentUser && currentUser.access === 'admin',
    //管理员都可以导出数据
    canExportExcel:
      (currentUser && currentUser.access === 'admin') ||
      (currentUser && currentUser.access === 'superAdmin'),
  };
}
