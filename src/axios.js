import axios from 'axios';

console.log('VITE_APP_ENV:', import.meta.env.VITE_APP_ENV);
console.log('VITE_API_BASE_URL_LOCAL:', import.meta.env.VITE_API_BASE_URL_LOCAL);
console.log('VITE_API_BASE_URL_VM:', import.meta.env.VITE_API_BASE_URL_VM);

const baseURL = import.meta.env.VITE_APP_ENV === 'development'
    ? import.meta.env.VITE_API_BASE_URL_LOCAL
    : import.meta.env.VITE_API_BASE_URL_VM;

console.log('API Base URL:', baseURL);
const api = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
     }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;