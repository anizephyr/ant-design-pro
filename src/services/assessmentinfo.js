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
// 机构考核导出
export async function exportOrgAssessment(params) {
  const body = { ...params, method: 'exportOrgAssessment' };
  return fetch(`${apiPath}orgAssessmentHandler`, {
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
// 机构考核导入模版下载
export async function downloadOrgAssessmentTemplate(params) {
  const body = { ...params, method: 'downloadOrgAssessmentTemplate' };
  return fetch(`${apiPath}orgAssessmentHandler`, {
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

// 查询人员考核指标（根据岗位）
export async function queryStaffIndicatorsByJob(params) {
  return request(`${apiPath}staffAssessmentHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'selectIndicators',
    },
  });
}
// 查询人员岗位（已关联指标的）
export async function queryStaffJobs(params) {
  return request(`${apiPath}staffAssessmentHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'selectJobs',
    },
  });
}
// 查询人员考核信息
export async function queryStaffAssessment(params) {
  return request(`${apiPath}staffAssessmentHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'queryStaffAssessment',
    },
  });
}
// 新增人员考核记录
export async function addStaffAssessment(params) {
  return request(`${apiPath}staffAssessmentHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'addStaffAssessment',
    },
  });
}
// 删除人员考核记录
export async function removeStaffAssessment(params) {
  return request(`${apiPath}staffAssessmentHandler`, {
    method: 'POST',
    body: {
      ...params,
      method: 'removeStaffAssessment',
    },
  });
}
// 人员考核导出
export async function exportStaffAssessment(params) {
  const body = { ...params, method: 'exportStaffAssessment' };
  return fetch(`${apiPath}staffAssessmentHandler`, {
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
// 人员考核导入模版下载
export async function downloadStaffAssessmentTemplate(params) {
  const body = { ...params, method: 'downloadStaffAssessmentTemplate' };
  return fetch(`${apiPath}staffAssessmentHandler`, {
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
