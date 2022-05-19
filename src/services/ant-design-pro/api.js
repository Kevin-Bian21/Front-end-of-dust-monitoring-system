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

export async function updateUser(body, options) {
  return request('/api/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getMonitorVideoSrc(params, options) {
  return request('/api/getMonitorVideoSrc', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getAllMonitorData(body, options) {
  return request('/api/getAllMonitorData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updatePassword(body, options) {
  return request('/api/updatePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getPersonalDetails(params, options) {
  return request('/api/getPersonalDetails', {
    method: 'GET',
    ...(options || {}),
  });
}
