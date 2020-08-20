import axios from 'axios';
import { getToken } from './cookies';
import cookies from 'react-cookies';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_DEV_BASE_URL;

export default axios.create({
  baseURL,
  headers: {
    'Cache-control': 'no-cache, no-store',
    Pragma: 'no-cache',
    'Content-Type': 'application/json',
  },

  transformRequest: [
    function (data, headers) {
      const token = getToken();

      if (token) headers['Authorization'] = `Bearer ` + token;
      if (data instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
        return data;
      }
      return JSON.stringify(data);
      // return data;
    },
  ], // transform the response before it get recieved
  transformResponse: [
    function (data, headers) {
      if (headers['content-type']?.indexOf('application/json') > -1) {
        const json = JSON.parse(data);
        return json;
      }

      return data;
    },
  ],
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 403) {
      window.location.pathname = '/forbidden';
    }
    if (error?.response?.status === 401) {
      cookies.remove('auth', { path: '/' });
      cookies.remove('user', { path: '/' });
      window.location.pathname = '/';
    }
    if (error?.response?.status === 500) {
      window.location.pathname = '/error';
    }
    throw error.response.data;
  }
);
