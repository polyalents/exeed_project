import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection';
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

      {/* Models Section - ОЧЕНЬ ШИРОКИЙ КОНТЕЙНЕР */}
      <section id="models" className="py-20 bg-gray-50">
        {/* Максимально широкий контейнер на всю ширину экрана */}
        <div className="max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 2xl:px-12">
          <h2 className="text-4xl font-heading font-bold text-center mb-16 text-exeed-dark">
            МОДЕЛЬНЫЙ РЯД EXEED
          </h2>
          
          {loading ? (
            <div className="text-center text-exeed-dark">Загрузка моделей...</div>
          ) : (
            /* Очень широкая горизонтальная сетка - больше места между колонками */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
              {models.map((model) => (
                <div 
                  key={model.id} 
                  className="bg-white rounded-none shadow-none overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Увеличиваем высоту изображения */}
                  <div 
                    className="h-48 lg:h-56 xl:h-64 bg-gray-200 bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${model.image})`,
                      backgroundColor: '#f3f4f6'
                    }} 
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-xl lg:text-2xl font-heading font-bold mb-2 text-exeed-dark">
                      {model.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {model.brand === 'EXEED' ? 'Кроссовер' : 'Электромобиль'}
                    </p>
                    <div className="text-lg font-semibold text-exeed-dark mb-4">
                      {model.price}
                    </div>
                    <button 
                      onClick={() => openModal('callback')}
                      className="w-full bg-exeed-dark hover:bg-exeed-black text-white py-2 px-4 transition-colors font-medium"
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Test Drive Section */}
      <section id="test-drive" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto section-padding text-center">
          <h2 className="text-4xl font-heading font-bold mb-12 text-exeed-dark">
            Записаться на тест-драйв
          </h2>
          <p className="text-xl text-exeed-dark/70 mb-8">
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
          <h2 className="text-4xl font-heading font-bold mb-12 text-exeed-dark">
            Кредит и рассрочка
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-exeed-dark">Авторассрочка</h3>
              <p className="text-exeed-dark/70 mb-4">От 20 000 ₽ в месяц</p>
              <button 
                onClick={() => openModal('callback')}
                className="btn-secondary"
              >
                Рассчитать
              </button>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-exeed-dark">Банковский кредит</h3>
              <p className="text-exeed-dark/70 mb-4">Ставка от 5,9% годовых</p>
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

      {/* Dealers Section */}
      <section id="dealers" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto section-padding">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-exeed-dark">
            Наши дилеры
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {dealers.map((dealer) => (
              <div 
                key={dealer.id} 
                className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200"
              >
                <h3 className="text-2xl font-heading font-bold mb-4 text-exeed-dark">
                  {dealer.name}
                </h3>
                <p className="text-exeed-dark/70 mb-2">{dealer.address}</p>
                <p className="text-exeed-dark font-semibold">{dealer.phone}</p>
                <button 
                  onClick={() => openModal('callback')}
                  className="btn-primary mt-4"
                >
                  Связаться
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;