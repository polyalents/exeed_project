import axios from 'axios';

// Определяем базовый URL для API в зависимости от окружения
const getApiBaseUrl = () => {
  // В продакшене используем полный URL сервера
  if (import.meta.env.PROD) {
    return 'http://5.129.203.118:5002/api';
  }
  
  // В разработке можем использовать переменную окружения или локальный адрес
  return import.meta.env.VITE_API_URL || 'http://localhost:5002/api';
};

const API_BASE = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Добавляем интерсептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    // Если сервер недоступен, возвращаем моковые данные
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      console.warn('API недоступен, используем моковые данные');
      
      // Возвращаем моковые данные в зависимости от URL
      const url = error.config.url;
      
      if (url.includes('/models')) {
        return Promise.resolve({
          data: [
            {
              id: 1, 
              name: 'EXEED LX',
              brand: 'EXEED',
              price: 'от 2 990 000 ₽',
              image: '/static/images/models/exeed-lx.jpg'
            },
            {
              id: 2,
              name: 'EXEED VX', 
              brand: 'EXEED',
              price: 'от 3 490 000 ₽',
              image: '/static/images/models/exeed-vx.jpg'
            },
            {
              id: 3,
              name: 'EXLANTIX ES',
              brand: 'EXLANTIX', 
              price: 'от 4 290 000 ₽',
              image: '/static/images/models/exlantix-es.jpg'
            }
          ]
        });
      }
      
      if (url.includes('/dealers')) {
        return Promise.resolve({
          data: [
            {
              id: 1,
              name: 'Дилер Пойменная',
              address: 'Ростов-на-Дону, ул. Пойменная, 1г',
              phone: '+7 (863) 320-33-54'
            },
            {
              id: 2,
              name: 'Дилер Малиновского',
              address: 'Ростов-на-Дону, ул. Малиновского, 43', 
              phone: '+7 (863) 320-33-55'
            }
          ]
        });
      }
      
      if (url.includes('/health')) {
        return Promise.resolve({
          data: { status: 'ok', message: 'Mock API is running' }
        });
      }
    }
    
    return Promise.reject(error);
  }
);

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
  
  // Отправить заявку на обратный звонок
  submitCallback: (data) => api.post('/callback', data),
};

export default apiService;