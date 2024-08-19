import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 40000,
  withCredentials: true,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export default instance;
