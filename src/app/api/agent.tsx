import axios from 'axios';

const agent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tambahkan interceptor jika diperlukan (opsional)
// agent.interceptors.request.use(
//   (config) => {
//     // Periksa apakah URL memerlukan token
//     const isAdminEndpoint = config.url.startsWith('/admin');
//     if (!isAdminEndpoint) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

agent.interceptors.response.use(
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


export default agent;
