import request from '@/utils/request';

export async function query() {
  return request('/server/api/users');
}

export async function queryCurrent(params) {
  return request('/server/api/userHandler', {
    method: 'POST',
    body: {
      ...params,
      method: 'currentUser',
    },
  });
}

// 登陆
export async function accountLogin(params) {
  return request('/server/api/userHandler', {
    method: 'POST',
    body: {
      ...params,
      method: 'login',
    },
  });
}
