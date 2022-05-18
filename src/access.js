/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canSuperAdmin: currentUser && currentUser.access === 'superAdmin',
    canExportExcel:
      (currentUser && currentUser.access === 'admin') ||
      (currentUser && currentUser.access === 'superAdmin'),
  };
}
