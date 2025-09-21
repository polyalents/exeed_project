import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';

const DealersMapSection = ({ dealers = [] }) => {
  const [selectedDealer, setSelectedDealer] = useState(null);
  const { openModal } = useModal();

  // Фиксированные координаты дилеров (полученные через геокодинг)
  const dealerCoordinates = {
    1: [47.200584, 39.641478], // ул. Пойменная, 1г
    2: [47.220843, 39.720531]  // ул. Малиновского, 43
  };

  // Центр карты (между двумя дилерами)
  const mapCenter = [47.210714, 39.680905];

  const handleDealerSelect = (dealer) => {
    setSelectedDealer(dealer);
  };

  // Формируем URL для iframe с метками НА КАРТЕ
  const getIframeUrl = () => {
    const baseUrl = 'https://yandex.ru/map-widget/v1/?';
    const params = new URLSearchParams({
      z: '12',
      ll: `${mapCenter[1]},${mapCenter[0]}`,
      l: 'map',
      // Добавляем метки для обоих дилеров ПРЯМО НА КАРТУ
      pt: dealers.map(dealer => {
        const coords = dealerCoordinates[dealer.id];
        return coords ? `${coords[1]},${coords[0]},pm2rdm` : null;
      }).filter(Boolean).join('~')
    });
    
    return baseUrl + params.toString();
  };

  return (
    <section id="dealers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-4xl font-heading font-bold text-center mb-12 text-black">
          Наши дилеры
        </h2>
        
        {/* ДЕСКТОП: Карточки СЛЕВА и СПРАВА от карты */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-start">
          {/* ЛЕВАЯ КАРТОЧКА */}
          <div className="space-y-6">
            {dealers[0] && (
              <div 
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border ${
                  selectedDealer?.id === dealers[0].id ? 'ring-2 ring-exeed-dark border-exeed-dark' : 'border-gray-200'
                }`}
                onClick={() => handleDealerSelect(dealers[0])}
              >
                <h3 className="text-xl font-heading font-bold mb-3 text-black">
                  {dealers[0].name}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p className="text-sm text-gray-600">{dealers[0].address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <a 
                      href={`tel:${dealers[0].phone.replace(/\D/g, '')}`}
                      className="text-sm font-semibold text-exeed-dark hover:text-exeed-black"
                    >
                      {dealers[0].phone}
                    </a>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal('callback');
                  }}
                  className="w-full bg-exeed-dark hover:bg-exeed-black text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  Связаться
                </button>
              </div>
            )}
          </div>

          {/* КАРТА В ЦЕНТРЕ */}
          <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={getIframeUrl()}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="rounded-2xl"
              title="Карта дилеров EXEED"
            />
          </div>

          {/* ПРАВАЯ КАРТОЧКА */}
          <div className="space-y-6">
            {dealers[1] && (
              <div 
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border ${
                  selectedDealer?.id === dealers[1].id ? 'ring-2 ring-exeed-dark border-exeed-dark' : 'border-gray-200'
                }`}
                onClick={() => handleDealerSelect(dealers[1])}
              >
                <h3 className="text-xl font-heading font-bold mb-3 text-black">
                  {dealers[1].name}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p className="text-sm text-gray-600">{dealers[1].address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <a 
                      href={`tel:${dealers[1].phone.replace(/\D/g, '')}`}
                      className="text-sm font-semibold text-exeed-dark hover:text-exeed-black"
                    >
                      {dealers[1].phone}
                    </a>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal('callback');
                  }}
                  className="w-full bg-exeed-dark hover:bg-exeed-black text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  Связаться
                </button>
              </div>
            )}
          </div>
        </div>

        {/* МОБИЛЬНАЯ ВЕРСИЯ: карта сверху, карточки снизу */}
        <div className="lg:hidden space-y-6">
          {/* Карта */}
          <div className="w-full h-[350px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={getIframeUrl()}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="rounded-2xl"
              title="Карта дилеров EXEED"
            />
          </div>
          
          {/* Карточки под картой */}
          <div className="grid gap-4">
            {dealers.map((dealer) => (
              <div 
                key={dealer.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-heading font-bold mb-3 text-black">
                  {dealer.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p className="text-sm text-gray-600">{dealer.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <a 
                      href={`tel:${dealer.phone.replace(/\D/g, '')}`}
                      className="text-sm font-semibold text-exeed-dark hover:text-exeed-black"
                    >
                      {dealer.phone}
                    </a>
                  </div>
                </div>
                
                <button 
                  onClick={() => openModal('callback')}
                  className="w-full bg-exeed-dark hover:bg-exeed-black text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
                >
                  Связаться
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Дополнительная информация */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Работаем ежедневно с 9:00 до 21:00
          </p>
          <button 
            onClick={() => openModal('callback')}
            className="bg-exeed-dark hover:bg-exeed-black text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Записаться на встречу
          </button>
        </div>
      </div>
    </section>
  );
};

export default DealersMapSection;