// src/components/Header/Header.jsx
import React, { useState } from 'react';
import MobileMenu from './MobileMenu';
import { useModal } from '../../context/ModalContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModal();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-exeed-header w-full shadow-lg">
        <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 py-4 sm:py-5 lg:py-6">
          <div className="flex items-center w-full">
            
            {/* Лого + меню вместе */}
            <div className="flex items-center">
              {/* Логотип */}
              <div className="flex-shrink-0">
                <img 
                  src="/static/images/logos/logo.webp" 
                  alt="EXEED & EXLANTIX" 
                  className="h-2.5 sm:h-2.5 lg:h-3 w-auto object-contain" 
                />
              </div>

              {/* Десктоп-меню (рядом с логотипом) */}
              <nav className="hidden xl:flex flex-col items-start space-y-2 ml-10">
                {/* Первая строка */}
                <div className="flex items-center space-x-4 2xl:space-x-6">
                  
                  {/* Выпадающее меню EXEED */}
                  <div className="relative group">
                    <a href="#" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
                      МОДЕЛИ EXEED
                    </a>
                    <div className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-exeed-dark/95 backdrop-blur-sm rounded-lg shadow-lg p-3 min-w-[180px] z-50">
                      <a href="#exeed-lx" className="px-3 py-2 text-white hover:text-orange-400">EXEED LX</a>
                      <a href="#exeed-txl" className="px-3 py-2 text-white hover:text-orange-400">EXEED TXL</a>
                      <a href="#exeed-rx" className="px-3 py-2 text-white hover:text-orange-400">EXEED RX</a>
                      <a href="#exeed-vx" className="px-3 py-2 text-white hover:text-orange-400">EXEED VX</a>
                    </div>
                  </div>

                  {/* Выпадающее меню EXLANTIX */}
                  <div className="relative group">
                    <a href="#" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
                      МОДЕЛИ EXLANTIX
                    </a>
                    <div className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-exeed-dark/95 backdrop-blur-sm rounded-lg shadow-lg p-3 min-w-[180px] z-50">
                      <a href="#exlantix-es" className="px-3 py-2 text-white hover:text-orange-400">EXLANTIX ES</a>
                      <a href="#exlantix-et" className="px-3 py-2 text-white hover:text-orange-400">EXLANTIX ET</a>
                    </div>
                  </div>

                  <a href="#test-drive" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
                    ТЕСТ-ДРАЙВ
                  </a>
                  <a href="#trade-in" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
                    TRADE-IN
                  </a>
                </div>

                {/* Вторая строка */}
                <div className="flex items-center space-x-4 2xl:space-x-6">
                  <a href="#credit" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
                    КРЕДИТ
                  </a>
                  <a href="#dealers" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
                    ДИЛЕРЫ
                  </a>
                  <a href="#about" className="text-white text-sm hover:text-orange-400 transition-colors font-medium">
                    О НАС
                  </a>
                </div>
              </nav>
            </div>

            {/* Контакты справа */}
            <div className="hidden xl:flex items-center space-x-6 ml-auto">
              {/* Адреса */}
              <div className="flex flex-col space-y-1 items-start text-xs 2xl:text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="text-gray-300">Ростов-на-Дону, ул. Пойменная, 1г</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="text-gray-300">Ростов-на-Дону, ул. Малиновского, 43</span>
                </div>
              </div>

              {/* Телефон */}
              <a 
                href="tel:+78633203354"
                className="flex items-center space-x-2 hover:text-orange-400 transition-colors text-xs 2xl:text-sm"
              >
                <svg className="w-4 h-4" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="font-semibold text-white">+7 863 320-33-54</span>
              </a>

              {/* Кнопка */}
              <button
                onClick={() => openModal('callback')}
                className="bg-exeed-gray hover:bg-white text-exeed-dark px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Обратный звонок
              </button>
            </div>

            {/* Мобильное меню справа */}
            <div className="xl:hidden flex items-center space-x-3 sm:space-x-4 ml-auto">
              {/* Телефон */}
              <button 
                onClick={() => openModal('callback')}
                className="text-white hover:text-orange-400 transition-colors p-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </button>

              {/* Гамбургер */}
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
          </div>
        </div>

        <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </header>

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
