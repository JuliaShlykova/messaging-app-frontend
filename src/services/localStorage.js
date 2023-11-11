

export const isTokenValid = () => {
  try {
    const token = getToken();
    if (!token) return false;
    // const decoded = jwt_decode(token);  // Using jwt-decode library
    // return decoded.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

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
  sessionStorage.set('userId', value);
}

export const getUser = () => {
  return sessionStorage.getItem('userId');
}