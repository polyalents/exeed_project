import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const apiService = {
  // Получить информацию о здоровье API
  getHealth: () => api.get('/health'),
  
  // Получить список моделей
  getModels: () => api.get('/models'),
  
  // Получить список дилеров
  getDealers: () => api.get('/dealers'),
  
  // Отправить заявку на тест-драйв
  submitTestDrive: (data) => api.post('/test-drive', data),
  
  // Отправить заявку на кредит
  submitCredit: (data) => api.post('/credit', data),
};

export default apiService;
