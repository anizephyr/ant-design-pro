import request from '@/utils/request';

const apiPath = '/DAP/yyrygl/';

// 基本信息变更历史纪录
export async function queryModifyHisList(params) {
  return request(`${apiPath}modifyhisHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'select',
    },
  });
}

export async function exportModifyHisList(params) {
  const body = { ...params, method: 'export' };
  return fetch(`${apiPath}modifyhisHandler`, {
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
