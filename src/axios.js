import axios from 'axios';

const baseURL =
    import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_API_BASE_URL_LOCAL
        : import.meta.env.VITE_API_BASE_URL_VM;

const api = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: { 'Authorization': 'Bearer yourToken' },
});

export default api;
