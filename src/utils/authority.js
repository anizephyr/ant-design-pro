// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('authority') || ['admin', 'user'];
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['stranger'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('authority', JSON.stringify(proAuthority));
}

export function getToken(str) {
  return typeof str === 'undefined' ? localStorage.getItem('token') : str;
}

export function setToken(token) {
  return localStorage.setItem('token', token);
}
