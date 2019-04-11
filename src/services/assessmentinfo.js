import request from '@/utils/request';

const apiPath = '/DAP/yyrygl/';
// 考核指标维护
// 查询考核指标
export async function queryIndicatorList(params) {
  return request(`${apiPath}indicatorlistHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'select',
    },
  });
}
// 删除考核指标
export async function removeIndicatorList(params) {
  return request(`${apiPath}indicatorlistHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
// 新增考核指标
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
// 查询岗位或人员考核指标
export async function queryRelationship(params) {
  return request(`${apiPath}relationshipHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'select',
    },
  });
}
// 查询某岗位对应的考核指标
export async function checkRelationship(params) {
  return request(`${apiPath}relationshipHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'check',
    },
  });
}
// 关联岗位与考核指标
export async function matchRelationship(params) {
  return request(`${apiPath}relationshipHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'match',
    },
  });
}

// 查询机构考核指标
export async function queryOrgIndicators(params) {
  return request(`${apiPath}orgAssessmentHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'selectIndicators',
    },
  });
}
// 新增机构考核记录
export async function addOrgAssessment(params) {
  return request(`${apiPath}orgAssessmentHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'addOrgAssessment',
    },
  });
}
// 查询机构考核记录
export async function queryOrgAssessment(params) {
  return request(`${apiPath}orgAssessmentHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'queryOrgAssessment',
    },
  });
}
// 删除机构考核记录
export async function removeOrgAssessment(params) {
  return request(`${apiPath}orgAssessmentHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'removeOrgAssessment',
    },
  });
}
