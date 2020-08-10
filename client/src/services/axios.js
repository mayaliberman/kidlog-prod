import axios from 'axios';
import { getToken } from './cookies';
import cookies from 'react-cookies';
export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Cache-control': 'no-cache, no-store',
    Pragma: 'no-cache',
    'Content-Type': 'application/json',
  },

  transformRequest: [
    function (data, headers) {
      const token = getToken();

      if (token) headers['Authorization'] = `Bearer ` + token;

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
    }
    if (error?.response?.status === 500) {
      window.location.pathname = '/error';
    }
    throw error.response.data;
  }
);
