/**
 * Axios instance
 *
 * Every service in this folder must use this instance instead of calling axios directly.
 */
import axios from 'axios';

import { API_BASE_URL } from '../constants/api.constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// TODO: request interceptor — attach the JWT: `Authorization: Bearer <token>`.
// TODO: response interceptor — handle 401 (logout + redirect to /login) and normalize errors.

export default api;
