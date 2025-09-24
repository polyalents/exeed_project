// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import { useModal } from '../../context/ModalContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const { openModal } = useModal();

  // Отслеживание размера экрана для адаптации
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 768) {
        setScreenSize('tablet-sm');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else if (width < 1280) {
        setScreenSize('laptop-sm');
      } else if (width < 1460) {
        setScreenSize('laptop-md');
      } else if (width < 1920) {
        setScreenSize('desktop');
      } else {
        setScreenSize('desktop-xl');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Плавная прокрутка к элементу
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Управление выпадающими меню
  const handleDropdownEnter = (dropdown) => {
    if (screenSize === 'desktop' || screenSize === 'desktop-xl') {
      setActiveDropdown(dropdown);
    }
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleItemClick = (sectionId) => {
    scrollToSection(sectionId);
    setActiveDropdown(null);
  };

  // Адаптивные стили в зависимости от размера экрана
  const getHeaderPadding = () => {
    switch (screenSize) {
      case 'mobile':
        return 'px-4 py-3';
      case 'tablet-sm':
        return 'px-6 py-3';
      case 'tablet':
        return 'px-8 py-4';
      case 'laptop-sm':
        return 'px-12 py-4';
      case 'laptop-md':
        return 'px-16 py-5';
      case 'desktop':
        return 'px-20 py-5';
      case 'desktop-xl':
        return 'px-24 py-6';
      default:
        return 'px-8 py-4';
    }
  };

  const getLogoSize = () => {
    switch (screenSize) {
      case 'mobile':
        return 'h-2';
      case 'tablet-sm':
        return 'h-2.5';
      case 'tablet':
      case 'laptop-sm':
        return 'h-2.5';
      case 'laptop-md':
        return 'h-3';
      case 'desktop':
        return 'h-3';
      case 'desktop-xl':
        return 'h-3.5';
      default:
        return 'h-2.5';
    }
  };

  const getContactsTextSize = () => {
    switch (screenSize) {
      case 'laptop-md':
        return 'text-xs';
      case 'desktop':
        return 'text-xs';
      case 'desktop-xl':
        return 'text-sm';
      default:
        return 'text-xs';
    }
  };

  const shouldShowContacts = () => {
    return ['desktop', 'desktop-xl'].includes(screenSize);
  };

  const shouldShowFullMenu = () => {
    return ['desktop', 'desktop-xl'].includes(screenSize);
  };

  const shouldShowCompactMenu = () => {
    return screenSize === 'laptop-sm';
  };

  const shouldShowMidSizeMenu = () => {
    return screenSize === 'laptop-md';
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-exeed-header w-full shadow-lg">
        <div className={`w-full ${getHeaderPadding()}`}>
          <div className="flex items-center w-full">
            
            {/* Лого */}
            <div className="flex-shrink-0">
              <button onClick={() => scrollToSection('hero-section')}>
                <img 
                  src="/static/images/logos/logo.webp" 
                  alt="EXEED & EXLANTIX" 
                  className={`${getLogoSize()} w-auto object-contain cursor-pointer transition-all duration-200`}
                />
              </button>
            </div>

            {/* Полное десктопное меню */}
            {shouldShowFullMenu() && (
              <nav className="flex flex-row items-center space-x-6 ml-10 2xl:ml-12">
                {/* Выпадающее меню EXEED */}
                <div 
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter('exeed')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button 
                    onClick={() => scrollToSection('exeed-models')}
                    className="text-white text-sm hover:text-orange-400 transition-colors font-medium cursor-pointer py-2 flex items-center space-x-1 whitespace-nowrap"
                  >
                    <span>МОДЕЛИ EXEED</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'exeed' ? 'rotate-180' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <div className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 transition-all duration-300 ease-out z-50 ${
                    activeDropdown === 'exeed' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <div className="bg-black/70 backdrop-blur-md rounded-lg shadow-2xl p-3 min-w-[240px] max-w-[300px]">
                      <div className="space-y-1">
                        <button 
                          onClick={() => handleItemClick('exeed-lx')} 
                          className="w-full px-4 py-3 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span>EXEED LX</span>
                          <div className="text-xs text-gray-300 mt-1">Компактный премиальный кроссовер</div>
                        </button>
                        
                        <button 
                          onClick={() => handleItemClick('exeed-txl')} 
                          className="w-full px-4 py-3 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span>EXEED TXL</span>
                          <div className="text-xs text-gray-300 mt-1">Среднеразмерный внедорожник</div>
                        </button>
                        
                        <button 
                          onClick={() => handleItemClick('exeed-rx')} 
                          className="w-full px-4 py-3 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span>EXEED RX</span>
                          <div className="text-xs text-gray-300 mt-1">Новое поколение премиум класса</div>
                        </button>
                        
                        <button 
                          onClick={() => handleItemClick('exeed-vx')} 
                          className="w-full px-4 py-3 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span>EXEED VX</span>
                          <div className="text-xs text-gray-300 mt-1">Полноразмерный внедорожник</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Выпадающее меню EXLANTIX */}
                <div 
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter('exlantix')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button 
                    onClick={() => scrollToSection('exlantix-models')}
                    className="text-white text-sm hover:text-orange-400 transition-colors font-medium cursor-pointer py-2 flex items-center space-x-1 whitespace-nowrap"
                  >
                    <span>МОДЕЛИ EXLANTIX</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'exlantix' ? 'rotate-180' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <div className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 transition-all duration-300 ease-out z-50 ${
                    activeDropdown === 'exlantix' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <div className="bg-black/70 backdrop-blur-md rounded-lg shadow-2xl p-3 min-w-[240px] max-w-[300px]">
                      <div className="space-y-1">
                        <button 
                          onClick={() => handleItemClick('exlantix-es')} 
                          className="w-full px-4 py-3 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span>EXLANTIX ES</span>
                          <div className="text-xs text-gray-300 mt-1">Гибридное четырехдверное купе</div>
                        </button>
                        
                        <button 
                          onClick={() => handleItemClick('exlantix-et')} 
                          className="w-full px-4 py-3 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span>EXLANTIX ET</span>
                          <div className="text-xs text-gray-300 mt-1">Технологическая платформа будущего</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Простые ссылки */}
                <button 
                  onClick={() => scrollToSection('test-drive')} 
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  ТЕСТ-ДРАЙВ
                </button>
                
                <button 
                  onClick={() => scrollToSection('credit')} 
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  КРЕДИТ
                </button>
                
                <button 
                  onClick={() => scrollToSection('trade-in')} 
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  TRADE-IN
                </button>

                <button 
                  onClick={() => scrollToSection('dealers')} 
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  ДИЛЕРЫ
                </button>
              </nav>
            )}

            {/* Средний размер меню для 1280-1460px */}
            {shouldShowMidSizeMenu() && (
              <nav className="flex flex-row items-center space-x-3 ml-8">
                <button 
                  onClick={() => scrollToSection('exeed-models')}
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  EXEED
                </button>
                
                <button 
                  onClick={() => scrollToSection('exlantix-models')}
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  EXLANTIX
                </button>
                
                <button 
                  onClick={() => scrollToSection('test-drive')} 
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  ТЕСТ-ДРАЙВ
                </button>
                
                <button 
                  onClick={() => scrollToSection('credit')} 
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  КРЕДИТ
                </button>
                
                <button 
                  onClick={() => scrollToSection('dealers')} 
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  ДИЛЕРЫ
                </button>
              </nav>
            )}

            {/* Компактное меню для очень маленьких ноутбуков */}
            {shouldShowCompactMenu() && (
              <nav className="flex flex-row items-center space-x-3 ml-6">
                <button 
                  onClick={() => scrollToSection('exeed-models')}
                  className="text-white text-xs hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  EXEED
                </button>
                
                <button 
                  onClick={() => scrollToSection('exlantix-models')}
                  className="text-white text-xs hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  EXLANTIX
                </button>
                
                <button 
                  onClick={() => scrollToSection('dealers')} 
                  className="text-white text-xs hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  ДИЛЕРЫ
                </button>
              </nav>
            )}

            {/* Контакты справа - только для больших экранов */}
            {shouldShowContacts() && (
              <div className="flex items-center space-x-4 xl:space-x-6 ml-auto">
                <div className={`flex flex-col space-y-1 items-start ${getContactsTextSize()}`}>
                  <div className="flex items-center space-x-2">
                    <svg className="w-3 h-3 xl:w-4 xl:h-4 flex-shrink-0" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="leading-tight">
                      <span className="text-white font-medium block lg:inline">SOKOL-MOTORS</span>
                      <span className="text-gray-300 block lg:inline lg:ml-1">— Пойменная, 1г</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-3 h-3 xl:w-4 xl:h-4 flex-shrink-0" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="leading-tight">
                      <span className="text-white font-medium block lg:inline">PRIDE</span>
                      <span className="text-gray-300 block lg:inline lg:ml-1">— Малиновского, 43</span>
                    </span>
                  </div>
                </div>

                <a 
                  href="tel:+78633203354"
                  className={`flex items-center space-x-1 xl:space-x-2 hover:text-orange-400 transition-colors ${getContactsTextSize()}`}
                  onClick={(e) => {
                    try {
                      return true;
                    } catch (error) {
                      e.preventDefault();
                    }
                  }}
                >
                  <svg className="w-3 h-3 xl:w-4 xl:h-4 flex-shrink-0" fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span className="font-semibold text-white whitespace-nowrap">+7 863 320-33-54</span>
                </a>

                <button
                  onClick={() => openModal('callback')}
                  className={`bg-exeed-gray hover:bg-white text-exeed-dark px-3 xl:px-4 py-2 rounded-lg ${getContactsTextSize()} font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap`}
                >
                  Обратный звонок
                </button>
              </div>
            )}

            {/* Кнопка звонка и модалки для средних экранов 1280-1460px */}
            {shouldShowMidSizeMenu() && (
              <div className="flex items-center space-x-2 ml-auto">
                <a 
                  href="tel:+78633203354"
                  className="text-white hover:text-orange-400 transition-colors p-1"
                  aria-label="Позвонить"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </a>
                
                <button
                  onClick={() => openModal('callback')}
                  className="bg-exeed-gray hover:bg-white text-exeed-dark px-2 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 whitespace-nowrap"
                >
                  Звонок
                </button>
              </div>
            )}

            {/* Кнопка звонка для маленьких ноутбуков */}
            {shouldShowCompactMenu() && (
              <div className="flex items-center space-x-2 ml-auto">
                <button 
                  onClick={() => openModal('callback')}
                  className="text-white hover:text-orange-400 transition-colors p-1"
                  aria-label="Обратный звонок"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Мобильное меню - для планшетов и телефонов */}
            {!shouldShowFullMenu() && !shouldShowCompactMenu() && !shouldShowMidSizeMenu() && (
              <div className="flex items-center space-x-3 sm:space-x-4 ml-auto">
                <button 
                  onClick={() => openModal('callback')}
                  className="text-white hover:text-orange-400 transition-colors p-1"
                  aria-label="Обратный звонок"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </button>

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
            )}

          </div>
        </div>

        {/* Мобильное меню */}
        <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </header>

      {/* Overlay для мобильного меню */}
      {isMenuOpen && !shouldShowFullMenu() && !shouldShowCompactMenu() && !shouldShowMidSizeMenu() && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Header;