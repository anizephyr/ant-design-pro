import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/server/api/project/notice');
}

export async function queryActivities() {
  return request('/server/api/activities');
}

export async function queryRule(params) {
  return request(`/server/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/server/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/server/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/server/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/server/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/server/api/fake_chart_data');
}

export async function queryTags() {
  return request('/server/api/tags');
}

export async function queryBasicProfile() {
  return request('/server/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/server/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/server/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/server/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/server/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/server/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeRegister(params) {
  return request('/server/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/server/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/server/api/captcha?mobile=${mobile}`);
}
