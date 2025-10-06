import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';

const DealersMapSection = ({ dealers = [] }) => {
  const [selectedDealer, setSelectedDealer] = useState(null);
  const { openModal } = useModal();

  const dealerCoordinates = {
    1: [47.205148, 39.727014],
    2: [47.244117, 39.612506],
  };

  const mapCenter = [47.224633, 39.66976];

  const getIframeUrl = () => {
    const baseUrl = 'https://yandex.ru/map-widget/v1/?';

    const isMobile =
      typeof window !== 'undefined' && window.innerWidth < 768;
    const zoomLevel = isMobile ? '12' : '13.3';

    const params = new URLSearchParams({
      z: zoomLevel,
      ll: `${mapCenter[1]},${mapCenter[0]}`,
      l: 'map',
      pt: dealers
        .map((dealer) => {
          const coords = dealerCoordinates[dealer.id];
          return coords ? `${coords[1]},${coords[0]},pm2orm` : null;
        })
        .filter(Boolean)
        .join('~'),
    });

    return baseUrl + params.toString();
  };

  const handleDealerSelect = (dealer) => setSelectedDealer(dealer);

  return (
    <section id="dealers" className="pt-20 pb-0 bg-white relative">
      <div className="w-full px-4 lg:px-8">
        <h2 className="text-4xl font-heading font-bold text-center mb-12 text-black">
          Наши дилеры
        </h2>
      </div>

      <div className="relative w-full">
        <div className="w-full h-[600px] lg:h-[700px] overflow-hidden shadow-lg">
          <iframe
            src={getIframeUrl()}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Карта дилеров EXEED"
          />
        </div>

        <div className="hidden lg:flex absolute top-16 left-0 right-0 z-10 justify-between px-12">
          {dealers.slice(0, 2).map((dealer) => (
            <div
              key={dealer.id}
              className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer w-80 flex flex-col justify-between ${
                selectedDealer?.id === dealer.id ? 'ring-2 ring-orange-500' : ''
              }`}
              onClick={() => handleDealerSelect(dealer)}
            >
              <div>
                <h3 className="text-xl font-heading font-bold mb-3 text-black leading-tight">
                  {dealer.name}
                </h3>
                <div className="flex items-start space-x-2 mb-5">
                  <svg
                    className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                  </svg>
                  <p className="text-sm text-gray-600 leading-snug">
                    Ростов-на-Дону,<br />
                    {dealer.address.split(', ').slice(1).join(', ')}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal('callback');
                }}
                className="w-full bg-black hover:bg-orange-500 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
              >
                Связаться
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden mt-8 px-4 pb-20">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
          {dealers.map((dealer) => (
            <div
              key={`mobile-${dealer.id}`}
              className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                selectedDealer?.id === dealer.id ? 'ring-2 ring-orange-500' : ''
              }`}
              onClick={() => handleDealerSelect(dealer)}
            >
              <div>
                <h3 className="text-lg font-heading font-bold mb-3 text-black leading-tight">
                  {dealer.name}
                </h3>
                <div className="flex items-start space-x-2 mb-5">
                  <svg
                    className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                  </svg>
                  <p className="text-sm text-gray-600 leading-snug">
                    Ростов-на-Дону,<br />
                    {dealer.address.split(', ').slice(1).join(', ')}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal('callback');
                }}
                className="w-full bg-black hover:bg-orange-500 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
              >
                Связаться
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealersMapSection;
