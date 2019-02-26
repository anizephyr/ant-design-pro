import request from '@/utils/request';

const apiPath = '/DAP/yyrygl/';
// 基本信息维护
export async function queryInfoList(params) {
  return request(`${apiPath}infolistHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'select',
    },
  });
}

export async function removeInfoList(params) {
  return request(`${apiPath}infolistHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addInfoList(params) {
  return request(`${apiPath}infolistHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function updateInfoList(params) {
  return request(`${apiPath}infolistHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
