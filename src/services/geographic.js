import request from '@/utils/request';

export async function queryProvince() {
  return request('/server/api/geographic/province');
}

export async function queryCity(province) {
  return request(`/server/api/geographic/city/${province}`);
}
