export const removeToken = () => {
  sessionStorage.removeItem('token');
}

export const setToken = (value) => {
  sessionStorage.setItem('token', value);
}

export const getToken = () => {
  return sessionStorage.getItem('token');
}

export const clearStorage = () => {
  sessionStorage.clear();
}

export const setUser = (value) => {
  sessionStorage.setItem('user', JSON.stringify(value));

}

export const getUser = () => {
  return JSON.parse(sessionStorage.getItem('user'));
}