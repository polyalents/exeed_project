import axios from 'axios';

// 🔧 Helper для логов только в dev
const devLog = (...args) => {
  if (import.meta.env.MODE === 'development') console.log(...args);
};

const API_BASE = '/api';
devLog('🔧 API Configuration:', {
  baseURL: API_BASE,
  env: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD
});

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 🛰 Интерсептор запросов
api.interceptors.request.use(
  (config) => {
    devLog('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullUrl: `${config.baseURL}${config.url}`
    });
    return config;
  },
  (error) => {
    if (import.meta.env.MODE === 'development')
      console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 🎯 Интерсептор ответов
api.interceptors.response.use(
  (response) => {
    devLog('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    if (import.meta.env.MODE === 'development') {
      console.error('❌ API Error:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status
      });
    }

    // 💾 Моки при недоступности сервера
    if (error.code === 'ERR_NETWORK' || !error.response) {
      const url = error.config?.url || '';
      devLog('🔄 Fallback: Используем моковые данные');

      if (url.includes('models')) {
        return Promise.resolve({
          data: [
            { id: 1, name: 'EXEED LX', brand: 'EXEED', price: 'от 2 690 000 ₽', image: '/static/images/models/exeedlx.webp' },
            { id: 2, name: 'EXEED TXL', brand: 'EXEED', price: 'от 3 250 000 ₽', image: '/static/images/models/exeedtxl.webp' },
            { id: 3, name: 'EXEED RX', brand: 'EXEED', price: 'от 3 990 000 ₽', image: '/static/images/models/rx.webp' },
            { id: 4, name: 'EXEED VX', brand: 'EXEED', price: 'от 4 490 000 ₽', image: '/static/images/models/vx.webp' },
            { id: 5, name: 'EXLANTIX ET', brand: 'EXLANTIX', price: 'от 6 600 000 ₽', image: '/static/images/models/exlantix-et.webp' },
            { id: 6, name: 'EXLANTIX ES', brand: 'EXLANTIX', price: 'от 5 990 000 ₽', image: '/static/images/models/exlantix-es.webp' }
          ]
        });
      }

      if (url.includes('dealers')) {
        return Promise.resolve({
          data: [
            { id: 1, name: 'Дилер ПРАЙД', address: 'Ростов-на-Дону, ул. Малиновского, 43', phone: '+7 (863) 320-33-55' },
            { id: 2, name: 'Дилер СОКОЛ-МОТОРС', address: 'Ростов-на-Дону, ул. Пойменная, 1г', phone: '+7 (863) 320-33-54' }
          ]
        });
      }

      if (url.includes('callback')) {
        return Promise.resolve({ data: { message: 'Заявка успешно отправлена (мок)', id: 1 } });
      }

      if (url.includes('health')) {
        return Promise.resolve({ data: { status: 'ok', message: 'Mock API' } });
      }
    }

    return Promise.reject(error);
  }
);

export const apiService = {
  getHealth: () => api.get('/health'),
  getModels: () => api.get('/models'),
  getDealers: () => api.get('/dealers'),
  submitTestDrive: (data) => api.post('/test-drive', data),
  submitCredit: (data) => api.post('/credit', data),
  submitCallback: (data) => api.post('/callback', data),
};

export default apiService;
