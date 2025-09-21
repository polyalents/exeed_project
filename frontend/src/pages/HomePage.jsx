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
        console.log('Loaded models:', modelsRes.data); // для отладки
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

      {/* Models Section */}
      <section id="models" className="py-20 bg-exeed-gray/20">
        <div className="max-w-7xl mx-auto section-padding">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-exeed-dark">
            Модельный ряд
          </h2>
          
          {loading ? (
            <div className="text-center text-exeed-dark">Загрузка моделей...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {models.map((model) => (
                <div 
                  key={model.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div 
                    className="h-64 bg-exeed-gray bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${model.image})`,
                      backgroundColor: '#d2d6db' // fallback цвет если изображение не загрузится
                    }} 
                  />
                  <div className="p-6">
                    <div className="text-sm text-exeed-dark font-semibold mb-2 uppercase">
                      {model.brand}
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-2 text-exeed-dark">
                      {model.name}
                    </h3>
                    <div className="text-xl font-semibold text-exeed-dark mb-4">
                      {model.price}
                    </div>
                    <button 
                      onClick={() => openModal('callback')}
                      className="btn-primary w-full"
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
        <div className="max-w-7xl mx-auto section-padding text-center">
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
      <section id="credit" className="py-20 bg-exeed-gray/20">
        <div className="max-w-7xl mx-auto section-padding text-center">
          <h2 className="text-4xl font-heading font-bold mb-12 text-exeed-dark">
            Кредит и рассрочка
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
        <div className="max-w-7xl mx-auto section-padding">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-exeed-dark">
            Наши дилеры
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {dealers.map((dealer) => (
              <div 
                key={dealer.id} 
                className="bg-exeed-gray/10 rounded-2xl p-8 text-center border border-exeed-gray/30"
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