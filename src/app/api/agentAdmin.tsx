import axios from 'axios';

const agentAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_ADMIN || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tambahkan interceptor jika diperlukan (opsional)
agentAdmin.interceptors.request.use(
  (config) => {
    // Misalnya, tambahkan token jika dibutuhkan
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

agentAdmin.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tangani error global
    if (error.response?.status === 401) {
      // Handle unauthorized error, e.g., redirect to login page
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);


export default agentAdmin;
