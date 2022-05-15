// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 获取当前的用户 GET /api/currentUser */

export async function currentUser(options) {
  return request('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  return request('/api/logout', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/login/account */

export async function login(body, options) {
  console.log(body);
  return request('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getEnvData(body, options) {
  return request('/api/presentEnvData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getDataThroughMonitorLocal(params, options) {
  return request('/api/getDataThroughMonitorLocal', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getUserInfo(body, options) {
  return request('/api/allUserInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function deleteUser(body, options) {
  return request('/api/deleteUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function addUser(body, options) {
  return request('/api/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// /** 此处后端没有提供注释 GET /api/notices */

// export async function getNotices(options) {
//   return request('/api/notices', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
// /** 获取规则列表 GET /api/rule */

// export async function rule(params, options) {
//   return request('/api/rule', {
//     method: 'GET',
//     params: { ...params },
//     ...(options || {}),
//   });
// }
// /** 新建规则 PUT /api/rule */

// export async function updateRule(options) {
//   return request('/api/rule', {
//     method: 'PUT',
//     ...(options || {}),
//   });
// }
// /** 新建规则 POST /api/rule */

// export async function addRule(options) {
//   return request('/api/rule', {
//     method: 'POST',
//     ...(options || {}),
//   });
// }
// /** 删除规则 DELETE /api/rule */

// export async function removeRule(options) {
//   return request('/api/rule', {
//     method: 'DELETE',
//     ...(options || {}),
//   });
// }
