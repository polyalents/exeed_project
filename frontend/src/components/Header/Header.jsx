import React, { useState } from 'react';
import MobileMenu from './MobileMenu';
import CallbackModal from './CallbackModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openCallbackModal = () => {
    setIsCallbackModalOpen(true);
  };

  const closeCallbackModal = () => {
    setIsCallbackModalOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-exeed-header w-full shadow-lg">
        <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 py-4 sm:py-5 lg:py-6">
          <div className="flex items-center justify-between w-full">
            
            {/* Логотип - слева */}
            <div className="flex-shrink-0">
              <img 
                src="/static/images/logos/logo.webp" 
                alt="EXEED & EXLANTIX" 
                className="h-2.5 sm:h-2.5 lg:h-3 w-auto object-contain" 
              />
            </div>

            {/* Мобильная версия - только телефон и гамбургер */}
            <div className="xl:hidden flex items-center space-x-3 sm:space-x-4">
              {/* Телефон - в мобильной версии открывает форму */}
              <button 
                onClick={openCallbackModal}
                className="text-white hover:text-orange-400 transition-colors p-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </button>

              {/* Гамбургер меню */}
              <button 
                onClick={toggleMenu}
                className="text-white p-1 hover:text-orange-400 transition-colors"
                aria-label="Открыть меню"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Десктопная версия - адаптивная информация */}
            <div className="hidden xl:flex items-center space-x-4 2xl:space-x-6 text-white text-xs 2xl:text-sm">
              {/* Адреса - горизонтально на больших экранах, вертикально на средних */}
              <div className="flex 2xl:flex-row flex-col 2xl:items-center 2xl:space-x-4 2xl:space-y-0 space-y-1 items-start">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 2xl:w-4 2xl:h-4" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="text-gray-300">Ростов-на-Дону, ул. Пойменная, 1г</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 2xl:w-4 2xl:h-4" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="text-gray-300">Ростов-на-Дону, ул. Малиновского, 43</span>
                </div>
              </div>
              
              {/* Телефон - показываем только на экранах 1440px+ */}
              <a 
                href="tel:+78633203354"
                className="2xl:flex hidden items-center space-x-2 hover:text-orange-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="font-semibold text-white">+7 863 320-33-54</span>
              </a>
            </div>

            {/* Десктопное меню */}
            <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-6">
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
              
              {/* Кнопка обратного звонка */}
              <button
                onClick={openCallbackModal}
                className="bg-exeed-gray hover:bg-white text-exeed-dark px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ml-4"
              >
                Обратный звонок
              </button>
            </nav>
          </div>
        </div>

        <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </header>

      <CallbackModal 
        isOpen={isCallbackModalOpen} 
        onClose={closeCallbackModal} 
      />

      {/* Overlay для закрытия меню при клике вне его */}
      {isMenuOpen && (
        <div 
          className="xl:hidden fixed inset-0 z-40 bg-black/50"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Header;