import cookies from 'react-cookies';
export const getToken = () => {
  return cookies.load('auth');
};

export const getUser = () => cookies.load('user');

export const setUser = (user) => cookies.save('user', user, { path: '/' });
