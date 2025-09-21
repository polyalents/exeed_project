import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';

const DealersMapSection = ({ dealers = [] }) => {
  const [selectedDealer, setSelectedDealer] = useState(null);
  const { openModal } = useModal();

  // Фиксированные координаты дилеров (ТОЧНЫЕ ИЗ ЯНДЕКС.КАРТ)
  const dealerCoordinates = {
    1: [47.205148, 39.727014], // ул. Пойменная, 1г (точные координаты)
    2: [47.244117, 39.612506]  // ул. Малиновского, 43 (точные координаты)
  };

  // Центр карты (обновленный между двумя дилерами)
  const mapCenter = [47.224633, 39.669760];

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
      <div className="w-full px-4 lg:px-8">
        <h2 className="text-4xl font-heading font-bold text-center mb-12 text-black">
          Наши дилеры
        </h2>
        
        {/* КАРТА НА ВСЕЙ ШИРИНЕ ЭКРАНА */}
        <div className="relative w-full">
          <div className="w-full h-[600px] overflow-hidden shadow-lg">
            <iframe
              src={getIframeUrl()}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className=""
              title="Карта дилеров EXEED"
            />
          </div>
          
          {/* Карточки поверх карты - ТОЛЬКО ДЕСКТОП */}
          <div className="hidden lg:flex absolute top-6 left-6 right-6 z-10 flex-row gap-4 justify-between">
            {dealers.map((dealer) => (
              <div 
                key={dealer.id}
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer w-80 h-56 flex flex-col transform hover:scale-105 ${
                  selectedDealer?.id === dealer.id ? 'ring-2 ring-exeed-dark' : ''
                }`}
                onClick={() => handleDealerSelect(dealer)}
              >
                <h3 className="text-xl font-heading font-bold mb-3 text-black leading-tight">
                  {dealer.name}
                </h3>
                
                <div className="flex-grow mb-4">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p className="text-sm text-gray-600 leading-snug">
                      Ростов-на-Дону,<br />{dealer.address.split(', ').slice(1).join(', ')}
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto">
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
              </div>
            ))}
          </div>
        </div>
        
        {/* МОБИЛЬНЫЙ СЛАЙДЕР ВНИЗУ */}
        <div className="lg:hidden mt-6">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 px-4" style={{ width: 'max-content' }}>
              {dealers.map((dealer) => (
                <div 
                  key={`mobile-${dealer.id}`}
                  className={`bg-white rounded-xl p-6 shadow-lg border border-gray-200 w-64 h-56 flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedDealer?.id === dealer.id ? 'ring-2 ring-exeed-dark' : ''
                  }`}
                  onClick={() => handleDealerSelect(dealer)}
                >
                  <h3 className="text-xl font-heading font-bold mb-3 text-black leading-tight">
                    {dealer.name}
                  </h3>
                  
                  <div className="flex-grow mb-4">
                    <div className="flex items-start space-x-2">
                      <svg className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <p className="text-sm text-gray-600 leading-snug">
                        Ростов-на-Дону,<br />{dealer.address.split(', ').slice(1).join(', ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealersMapSection;