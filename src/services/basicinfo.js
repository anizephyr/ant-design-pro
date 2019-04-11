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

// 积分管理 查询积分记录
export async function queryMarkHisList(params) {
  return request(`${apiPath}markhisHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'select',
    },
  });
}
// 积分管理 删除积分记录
export async function removeMarkHisList(params) {
  return request(`${apiPath}markhisHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
// 积分管理 增加积分记录
export async function addMarkHisList(params) {
  return request(`${apiPath}markhisHandler`, {
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
  return fetch(`${apiPath}markhisHandler`, {
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
  return fetch(`${apiPath}markhisHandler`, {
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
