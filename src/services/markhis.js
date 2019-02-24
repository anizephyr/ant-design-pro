import request from '@/utils/request';

// 积分管理 查询积分记录
export async function queryMarkHisList(params) {
  return request('/server/api/markhisHandler', {
    method: 'POST',
    body: {
      ...params,
      method: 'select',
    },
  });
}
// 积分管理 删除积分记录
export async function removeMarkHisList(params) {
  return request('/server/api/markhisHandler', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
// 积分管理 增加积分记录
export async function addMarkHisList(params) {
  return request('/server/api/markhisHandler', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
// 积分管理 导出积分记录
export async function exportMarkHisList(params) {
  const body = { ...params, method: 'export' };
  return fetch('/server/api/markhisHandler', {
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

// 积分管理 下载导入模版
export async function downloadTemplate(params) {
  const body = { ...params, method: 'template' };
  return fetch('/server/api/markhisHandler', {
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
