import request from '@/utils/request';

const apiPath = '/DAP/yyrygl/';

export async function query() {
  return request('/server/api/users');
}

export async function queryCurrent(params) {
  return request(`${apiPath}userHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'currentUser',
    },
  });
}

// 登陆
export async function accountLogin(params) {
  return request(`${apiPath}userHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'login',
    },
  });
}

// 登出
export async function accountLogout(params) {
  return request(`${apiPath}userHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'logout',
    },
  });
}

// 修改密码
export async function changePassword(params) {
  return request(`${apiPath}userHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'change',
    },
  });
}
