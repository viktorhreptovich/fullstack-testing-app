import axios from 'axios';
import { getAccessTokenFromLocalStorage } from '../utils/storage/token.localstorage.ts';
import { getTestIdFromLocalStorage } from '../utils/storage/testid.localstorage.ts';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
});

apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAccessTokenFromLocalStorage()}`;
  config.headers['Test-Id'] = getTestIdFromLocalStorage();
  return config;
});

export default apiClient;
