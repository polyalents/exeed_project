import axios from 'axios';

// Принудительно используем прокси в разработке
const API_BASE = '/api';

console.log('🔧 API Configuration:');
console.log('  - Base URL:', API_BASE);
console.log('  - Environment:', import.meta.env.MODE);
console.log('  - Dev mode:', import.meta.env.DEV);
console.log('  - Prod mode:', import.meta.env.PROD);

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Интерсептор для логирования запросов
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullUrl: `${config.baseURL}${config.url}`,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Интерсептор для обработки ответов и ошибок
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      fullError: error
    });
    
    // Если сервер недоступен, возвращаем моковые данные
    if (error.code === 'ERR_NETWORK' || !error.response) {
      console.warn('🔄 Fallback: Используем моковые данные');
      
      const url = error.config?.url || '';
      
      if (url.includes('models')) {
        console.log('📦 Returning mock models data');
        return Promise.resolve({
          data: [
            {
              id: 1, 
              name: 'EXEED LX',
              brand: 'EXEED',
              price: 'от 2 690 000 ₽',
              image: '/static/images/models/exeedlx.webp'
            },
            {
              id: 2,
              name: 'EXEED TXL', 
              brand: 'EXEED',
              price: 'от 3 250 000 ₽',
              image: '/static/images/models/exeedtxl.webp'
            },
            {
              id: 3,
              name: 'EXEED RX',
              brand: 'EXEED',
              price: 'от 3 990 000 ₽',
              image: '/static/images/models/rx.webp'
            },
            {
              id: 4,
              name: 'EXEED VX', 
              brand: 'EXEED',
              price: 'от 4 490 000 ₽',
              image: '/static/images/models/vx.webp'
            },
            {
              id: 5,
              name: 'EXLANTIX ET',
              brand: 'EXLANTIX', 
              price: 'от 6 600 000 ₽',
              image: '/static/images/models/exlantix-et.webp'
            },
            {
              id: 6,
              name: 'EXLANTIX ES',
              brand: 'EXLANTIX', 
              price: 'от 5 990 000 ₽',
              image: '/static/images/models/exlantix-es.webp'
            }
          ]
        });
      }
      
      if (url.includes('dealers')) {
        console.log('📦 Returning mock dealers data');
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
      
      if (url.includes('callback')) {
        console.log('📦 Returning mock callback response');
        return Promise.resolve({
          data: { message: 'Заявка успешно отправлена (мок)', id: 1 }
        });
      }
      
      if (url.includes('health')) {
        console.log('📦 Returning mock health response');
        return Promise.resolve({
          data: { status: 'ok', message: 'Mock API' }
        });
      }
    }
    
    return Promise.reject(error);
  }
);

export const apiService = {
  // Получить информацию о здоровье API
  getHealth: () => {
    console.log('🔍 Calling getHealth');
    return api.get('/health');
  },
  
  // Получить список моделей
  getModels: () => {
    console.log('🔍 Calling getModels');
    return api.get('/models');
  },
  
  // Получить список дилеров
  getDealers: () => {
    console.log('🔍 Calling getDealers');
    return api.get('/dealers');
  },
  
  // Отправить заявку на тест-драйв
  submitTestDrive: (data) => {
    console.log('🔍 Calling submitTestDrive', data);
    return api.post('/test-drive', data);
  },
  
  // Отправить заявку на кредит
  submitCredit: (data) => {
    console.log('🔍 Calling submitCredit', data);
    return api.post('/credit', data);
  },
  
  // Отправить заявку на обратный звонок
  submitCallback: (data) => {
    console.log('🔍 Calling submitCallback', data);
    return api.post('/callback', data);
  },
};

export default apiService;