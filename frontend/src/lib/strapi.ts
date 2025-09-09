import axios from 'axios';

const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерсептор для добавления токена авторизации
strapi.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерсептор для обработки ошибок
strapi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Тут можно будет добавить обработку ошибок, например, 401/403
    return Promise.reject(error);
  }
);

export default strapi;
