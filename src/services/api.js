import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// PG APIs
export const pgAPI = {
  getAll: (params) => api.get('/pgs', { params }),
  getById: (id) => api.get(`/pgs/${id}`),
  create: (data) => api.post('/pgs', data),
  update: (id, data) => api.put(`/pgs/${id}`, data),
  delete: (id) => api.delete(`/pgs/${id}`),
  addReview: (id, data) => api.post(`/pgs/${id}/reviews`, data),
};

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export default api;
