import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import apiService from '../services/api';

const HomePage = () => {
  const [models, setModels] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modelsRes, dealersRes] = await Promise.all([
          apiService.getModels(),
          apiService.getDealers()
        ]);
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
{/* Header */}
<header className="fixed top-0 left-0 right-0 z-50 bg-exeed-header w-full shadow-lg">
  <div className="w-full px-4 py-3 lg:py-6">
    <div className="flex items-center justify-between w-full">
      
      {/* Логотип - слева */}
      <div className="flex-shrink-0">
        <img src="/static/images/logos/logo.webp" alt="EXEED & EXLANTIX" className="h-4 lg:h-5 w-auto object-contain" />
      </div>

      {/* Мобильная версия - только иконки */}
      <div className="lg:hidden flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <svg className="w-3 h-3" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        
        <div className="flex items-center space-x-1">
          <svg className="w-3 h-3" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <span className="text-white text-xs">320-33-54</span>
        </div>

        {/* Гамбургер меню */}
        <button className="text-white p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Десктопная версия - полная информация */}
      <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-white text-sm">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>Ростов-на-Дону, Пойменная, 1г</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>Ростов-на-Дону, ул. Малиновского, 43</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <span className="font-semibold">+7 863 320-33-54</span>
        </div>
      </div>

      {/* Десктопное меню */}
      <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
        <a href="#models" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
          EXEED
        </a>
        <a href="#models" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
          EXLANTIX
        </a>
        <a href="#test-drive" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
          ТЕСТ-ДРАЙВ
        </a>
        <a href="#credit" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
          КРЕДИТ
        </a>
        <a href="#dealers" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
          ДИЛЕРЫ
        </a>
      </nav>

    </div>
  </div>
</header>
      {/* Hero Section */}
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
            <div className="grid md:grid-cols-3 gap-8">
              {models.map((model) => (
                <div key={model.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-64 bg-exeed-gray bg-cover bg-center" 
                       style={{ backgroundImage: `url(${model.image})` }}>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-exeed-dark font-semibold mb-2">
                      {model.brand}
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-2 text-exeed-dark">
                      {model.name}
                    </h3>
                    <div className="text-xl font-semibold text-exeed-dark mb-4">
                      {model.price}
                    </div>
                    <button className="btn-primary w-full">
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
          <button className="btn-primary text-lg px-8 py-4">
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
              <button className="btn-secondary">Рассчитать</button>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-exeed-dark">Банковский кредит</h3>
              <p className="text-exeed-dark/70 mb-4">Ставка от 5,9% годовых</p>
              <button className="btn-secondary">Подать заявку</button>
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
              <div key={dealer.id} className="bg-exeed-gray/10 rounded-2xl p-8 text-center border border-exeed-gray/30">
                <h3 className="text-2xl font-heading font-bold mb-4 text-exeed-dark">
                  {dealer.name}
                </h3>
                <p className="text-exeed-dark/70 mb-2">{dealer.address}</p>
                <p className="text-exeed-dark font-semibold">{dealer.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;