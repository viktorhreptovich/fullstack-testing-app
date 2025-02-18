import axios from 'axios';
import { getAccessTokenFromLocalStorage } from '../utils/storage/token.localstorage.ts';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
  },
});
