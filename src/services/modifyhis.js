import request from '@/utils/request';

// 基本信息变更历史纪录
export async function queryModifyHisList(params) {
  return request('/server/api/modifyhisHandler', {
    method: 'POST',
    body: {
      ...params,
      method: 'select',
    },
  });
}

export async function exportModifyHisList(params) {
  const body = { ...params, method: 'export' };
  return fetch('/server/api/modifyhisHandler', {
    method: 'POST',
    credentials: 'include',
    // expirys: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  }).then(resp => resp.blob());
}
