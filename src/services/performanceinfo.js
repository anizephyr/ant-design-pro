import request from '@/utils/request';

const apiPath = '/DAP/yyrygl/';
// 考核指标维护
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

// 指标与岗位关系维护
export async function queryRelationship(params) {
  return request(`${apiPath}relationshipHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'select',
    },
  });
}

export async function matchRelationship(params) {
  return request(`${apiPath}relationshipHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'match',
    },
  });
}
