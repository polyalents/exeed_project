import React from 'react';

const MobileMenu = ({ isOpen, onClose, onNavigate }) => {
  const handleNavClick = (path) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div
      className={`xl:hidden transition-[max-height,opacity] duration-300 ease-in-out ${
        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-exeed-header border-t border-gray-600`}
    >
      <nav className="px-8 sm:px-12 py-6 space-y-1 text-center">

        {/* МОДЕЛИ EXEED */}
        <button
          onClick={() => handleNavClick('/exeed-models')}
          className="block w-full text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          МОДЕЛИ EXEED
        </button>
        <div className="flex items-center justify-center">
          <div className="w-3/4 h-[1px] min-h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>

        {/* МОДЕЛИ EXLANTIX */}
        <button
          onClick={() => handleNavClick('/exlantix-models')}
          className="block w-full text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          МОДЕЛИ EXLANTIX
        </button>
        <div className="flex items-center justify-center">
          <div className="w-3/4 h-[1px] min-h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>

        {/* ТЕСТ-ДРАЙВ */}
        <button
          onClick={() => handleNavClick('/test-drive')}
          className="block w-full text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          ТЕСТ-ДРАЙВ
        </button>
        <div className="flex items-center justify-center">
          <div className="w-3/4 h-[1px] min-h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>

        {/* КРЕДИТ */}
        <button
          onClick={() => handleNavClick('/credit')}
          className="block w-full text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          КРЕДИТ
        </button>
        <div className="flex items-center justify-center">
          <div className="w-3/4 h-[1px] min-h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>

        {/* TRADE-IN */}
        <button
          onClick={() => handleNavClick('/trade-in')}
          className="block w-full text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          TRADE-IN
        </button>
        <div className="flex items-center justify-center">
          <div className="w-3/4 h-[1px] min-h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>

        {/* ДИЛЕРЫ */}
        <button
          onClick={() => handleNavClick('/dealers')}
          className="block w-full text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          ДИЛЕРЫ
        </button>

        {/* Контакты */}
        <div className="pt-8 mt-6 border-t border-gray-600 space-y-4 text-gray-300 text-sm">
          {/* Адреса */}
          <div className="space-y-3">
            
            {/* СОКОЛ-МОТОРС */}
            <div className="flex justify-center gap-2 text-center leading-snug">
              <div className="flex-shrink-0 flex items-start pt-[3px]">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm sm:text-base">
                <span className="text-white font-semibold">СОКОЛ-МОТОРС —</span> Ростов-на-Дону, ул. Пойменная, 1г
              </span>
            </div>

            {/* ПРАЙД */}
            <div className="flex justify-center gap-2 text-center leading-snug">
              <div className="flex-shrink-0 flex items-start pt-[3px]">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm sm:text-base">
                <span className="text-white font-semibold">ПРАЙД —</span> Ростов-на-Дону, ул. Малиновского, 43
              </span>
            </div>
          </div>

          {/* Телефон */}
          <div className="pt-2 text-center">
            <a
              href="tel:+78633203354"
              className="inline-flex items-center space-x-2 text-white hover:text-orange-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span className="font-semibold text-lg">+7 863 320-33-54</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;