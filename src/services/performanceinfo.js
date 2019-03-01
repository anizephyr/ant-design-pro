import request from '@/utils/request';

const apiPath = '/DAP/yyrygl/';
// 基本信息维护
export async function queryIndicatorList(params) {
  return request(`${apiPath}indicatorlistHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'select',
    },
  });
}

export async function removeIndicatorList(params) {
  return request(`${apiPath}indicatorlistHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addIndicatorList(params) {
  return request(`${apiPath}indicatorlistHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
