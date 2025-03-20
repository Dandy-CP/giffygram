import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GIPHY_BASE_URL,
  timeout: 45000,
  headers: {
    Accept: 'application/json',
  },
});

client.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(undefined, (error) => {
  return Promise.reject(error);
});
