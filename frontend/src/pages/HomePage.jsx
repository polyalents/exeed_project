import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection';
import DealersMapSection from '../components/DealersMapSection';
import apiService from '../services/api';
import { useModal } from '../context/ModalContext';

const HomePage = () => {
  const [models, setModels] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modelsRes, dealersRes] = await Promise.all([
          apiService.getModels(),
          apiService.getDealers()
        ]);
        console.log('Loaded models:', modelsRes.data);
        setModels(modelsRes.data);
        setDealers(dealersRes.data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />

      {/* Models Section - ОБНОВЛЕННАЯ ВЕРСИЯ */}
      <section id="models" className="py-20 bg-gray-50">
        <div className="max-w-[2000px] mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-center mb-16 text-black">
            МОДЕЛЬНЫЙ РЯД EXEED
          </h2>
          
          {loading ? (
            <div className="text-center text-black">Загрузка моделей...</div>
          ) : (
            <div className="space-y-8">
              {/* Первая строка - 4 модели EXEED */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-start">
                {models.filter(model => model.brand === 'EXEED').map((model) => (
                  <div 
                    key={model.id} 
                    className="flex flex-col h-full"
                  >
                    {/* Изображение - БЕЗ ФОНА */}
                    <div className="relative h-64 p-4 flex items-center justify-center">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-contain"
                        style={{ maxHeight: '220px' }}
                      />
                    </div>
                    
                    {/* Контент - БЕЗ ФОНА */}
                    <div className="p-6 flex flex-col flex-grow text-center">
                      <h3 className="text-xl font-heading font-bold mb-2 text-black">
                        {model.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Кроссовер
                      </p>
                      <div className="text-lg font-semibold text-black mb-4 mt-auto">
                        {model.price}
                      </div>
                      <div className="flex justify-center">
                        <button 
                          onClick={() => openModal('callback')}
                          className="bg-white hover:bg-black text-black hover:text-white py-2 px-6 transition-colors font-medium text-sm"
                          style={{ border: '2px solid rgba(0, 0, 0, 0.5)' }}
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Вторая строка - 2 модели EXLANTIX слева */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-start">
                {models.filter(model => model.brand === 'EXLANTIX').map((model) => (
                  <div 
                    key={model.id} 
                    className="flex flex-col h-full"
                  >
                    {/* Изображение - БЕЗ ФОНА */}
                    <div className="relative h-64 p-4 flex items-center justify-center">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-contain"
                        style={{ maxHeight: '220px' }}
                      />
                    </div>
                    
                    {/* Контент - БЕЗ ФОНА */}
                    <div className="p-6 flex flex-col flex-grow text-center">
                      <h3 className="text-xl font-heading font-bold mb-2 text-black">
                        {model.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Электромобиль
                      </p>
                      <div className="text-lg font-semibold text-black mb-4 mt-auto">
                        {model.price}
                      </div>
                      <div className="flex justify-center">
                        <button 
                          onClick={() => openModal('callback')}
                          className="bg-white hover:bg-black text-black hover:text-white py-2 px-6 transition-colors font-medium text-sm"
                          style={{ border: '2px solid rgba(0, 0, 0, 0.5)' }}
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Пустые блоки для выравнивания (скрыты на мобилке) */}
                <div className="hidden lg:block"></div>
                <div className="hidden lg:block"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Test Drive Section */}
      <section id="test-drive" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto section-padding text-center">
          <h2 className="text-4xl font-heading font-bold mb-12 text-black">
            Записаться на тест-драйв
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Почувствуйте мощь и комфорт автомобилей EXEED и EXLANTIX
          </p>
          <button 
            onClick={() => openModal('callback')} 
            className="btn-primary text-lg px-8 py-4"
          >
            Записаться на тест-драйв
          </button>
        </div>
      </section>

      {/* Credit Section */}
      <section id="credit" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto section-padding text-center">
          <h2 className="text-4xl font-heading font-bold mb-12 text-black">
            Кредит и рассрочка
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-black">Авторассрочка</h3>
              <p className="text-gray-700 mb-4">От 20 000 ₽ в месяц</p>
              <button 
                onClick={() => openModal('callback')}
                className="btn-secondary"
              >
                Рассчитать
              </button>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-black">Банковский кредит</h3>
              <p className="text-gray-700 mb-4">Ставка от 5,9% годовых</p>
              <button 
                onClick={() => openModal('callback')}
                className="btn-secondary"
              >
                Подать заявку
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dealers Section - НОВАЯ СЕКЦИЯ С КАРТОЙ */}
      <DealersMapSection dealers={dealers} />

    </div>
  );
};

export default HomePage;