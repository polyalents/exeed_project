// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { useModal } from '../../context/ModalContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const { openModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  // Отслеживание размера экрана для адаптации
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 768) {
        setScreenSize('tablet-sm');
      } else if (width < 810) {
        setScreenSize('tablet-vert');      
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else if (width < 1280) {
        setScreenSize('laptop-sm');
      } else if (width < 1460) {
        setScreenSize('laptop-md');
      } else if (width < 1690) {
        setScreenSize('desktop-sm');
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

  // Эффект для скролла при изменении URL
  useEffect(() => {
    const pathname = location.pathname.replace('/', '');
    
    // Список секций, которые находятся на главной странице
    const homePageSections = ['exeed-models', 'exlantix-models'];
    
    if (pathname && homePageSections.includes(pathname)) {
      // Если это секция на главной странице - скроллим к ней
      setTimeout(() => {
        const element = document.getElementById(pathname);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else if (pathname === '') {
      // Если путь пустой - скроллим наверх
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Функция навигации с плавным скроллом
  const handleNavigation = (path) => {
    const section = path.replace("/", "");

    // 🔹 все секции на главной странице
    const homeSections = [
      "exeed-models", "exlantix-models", "exeed-lx", "exeed-txl",
      "exeed-rx", "exeed-vx", "exlantix-et", "exlantix-es",
      "credit", "test-drive", "trade-in", "dealers"
    ];

    const onHomePage = location.pathname === "/";

    // Если мы не на главной странице — возвращаемся туда и ждём рендер
    if (!onHomePage && homeSections.includes(section)) {
      navigate("/"); 
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      }, 400);
      return;
    }

    // Если мы уже на главной — просто скроллим
    if (homeSections.includes(section)) {
      const el = document.getElementById(section);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
      return;
    }

    // Всё остальное — обычная навигация
    navigate(path);
  };

  // Управление выпадающими меню
  const handleDropdownEnter = (dropdown) => {
    if (['desktop', 'desktop-xl', 'desktop-sm', 'laptop-md'].includes(screenSize)) {
      setActiveDropdown(dropdown);
    }
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleItemClick = (path) => {
    handleNavigation(path);
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
        return 'px-14 py-4';
      case 'desktop-sm':
        return 'px-16 py-5';
      case 'desktop':
        return 'px-20 py-5';
      case 'desktop-xl':
        return 'px-24 py-6';
      default:
        return 'px-8 py-4';
    }
  };

  const shouldShowContacts = () => {
    return ['laptop-md', 'desktop-sm', 'desktop', 'desktop-xl'].includes(screenSize);
  };

  const shouldShowFullMenu = () => {
    return ['desktop', 'desktop-xl'].includes(screenSize);
  };

  const shouldShowMediumMenu = () => {
    return screenSize === 'desktop-sm';
  };

  const shouldShowLaptopMenu = () => {
    return screenSize === 'laptop-md';
  };

  const shouldShowMobileMenu = () => {
    return ['mobile', 'tablet-sm', 'tablet', 'tablet-vert', 'laptop-sm'].includes(screenSize);
  };

  const getContactsTextSize = () => {
    switch (screenSize) {
      case 'laptop-md':
      case 'desktop-sm':
        return 'text-xs';
      case 'desktop':
      case 'desktop-xl':
        return 'text-sm';
      default:
        return 'text-xs';
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-exeed-header w-full shadow-lg">
        <div className={`w-full ${getHeaderPadding()}`}>
          <div className="flex items-center w-full">
            
            {/* Лого */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => handleNavigation('/')}
                className="cursor-pointer"
              >
                <img 
                  src="/static/images/logos/logo.webp" 
                  alt="EXEED & EXLANTIX" 
                  className="h-3 md:h-1.3 w-auto object-contain transition-all duration-200"
                />
              </button>
            </div>

            {/* Полное десктопное меню для 1690+ */}
            {shouldShowFullMenu() && (
              <nav className="flex flex-row items-center space-x-6 ml-10 2xl:ml-12">
                {/* Выпадающее меню EXEED */}
                <div 
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter('exeed')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    onClick={() => handleNavigation('/exeed-models')}
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
                    <div className="bg-black/70 backdrop-blur-md rounded-lg shadow-2xl p-2 min-w-[250px] max-w-[300px]">
                      <div className="space-y-1">
                        <button
                          onClick={() => handleItemClick('/exeed-lx')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-sm">EXEED LX</span>
                          <div className="text-xs text-gray-300 mt-1">Элегантный городской кроссовер</div>
                        </button>
                        
                        <button
                          onClick={() => handleItemClick('/exeed-txl')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-sm">EXEED TXL</span>
                          <div className="text-xs text-gray-300 mt-1">Стильный семейный SUV</div>
                        </button>
                        
                        <button
                          onClick={() => handleItemClick('/exeed-rx')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-sm">EXEED RX</span>
                          <div className="text-xs text-gray-300 mt-1">Мощный и современный кроссовер</div>
                        </button>
                        
                        <button
                          onClick={() => handleItemClick('/exeed-vx')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-sm">EXEED VX</span>
                          <div className="text-xs text-gray-300 mt-1">Полноразмерный кроссовер</div>
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
                    onClick={() => handleNavigation('/exlantix-models')}
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
                    <div className="bg-black/70 backdrop-blur-md rounded-lg shadow-2xl p-2 min-w-[250px] max-w-[300px]">
                      <div className="space-y-1">
                        <button
                          onClick={() => handleItemClick('/exlantix-es')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-sm">EXLANTIX ES</span>
                          <div className="text-xs text-gray-300 mt-1">Электрический седан премиум-класса</div>
                        </button>
                        
                        <button
                          onClick={() => handleItemClick('/exlantix-et')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-sm">EXLANTIX ET</span>
                          <div className="text-xs text-gray-300 mt-1">Электрический кроссовер будущего</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Простые ссылки */}
                <button
                  onClick={() => handleNavigation('/test-drive')}
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  ТЕСТ-ДРАЙВ
                </button>
                
                <button
                  onClick={() => handleNavigation('/credit')}
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  КРЕДИТ
                </button>
                
                <button
                  onClick={() => handleNavigation('/trade-in')}
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  TRADE-IN
                </button>

                <button
                  onClick={() => handleNavigation('/dealers')}
                  className="text-white text-sm hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  ДИЛЕРЫ
                </button>
              </nav>
            )}

            {/* Среднее меню для 1460-1690px */}
            {shouldShowMediumMenu() && (
              <nav className="flex flex-row items-center space-x-4 ml-8">
                {/* Выпадающее меню EXEED */}
                <div 
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter('exeed')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    onClick={() => handleNavigation('/exeed-models')}
                    className="text-white text-xs hover:text-orange-400 transition-colors font-medium cursor-pointer py-2 flex items-center space-x-1 whitespace-nowrap"
                  >
                    <span>МОДЕЛИ EXEED</span>
                    <svg 
                      className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'exeed' ? 'rotate-180' : ''}`} 
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
                    <div className="bg-black/70 backdrop-blur-md rounded-lg shadow-2xl p-2 min-w-[200px] max-w-[250px]">
                      <div className="space-y-1">
                        <button
                          onClick={() => handleItemClick('/exeed-lx')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-xs">EXEED LX</span>
                        </button>
                        
                        <button
                          onClick={() => handleItemClick('/exeed-txl')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-xs">EXEED TXL</span>
                        </button>
                        
                        <button
                          onClick={() => handleItemClick('/exeed-rx')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-xs">EXEED RX</span>
                        </button>
                        
                        <button
                          onClick={() => handleItemClick('/exeed-vx')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-xs">EXEED VX</span>
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
                    onClick={() => handleNavigation('/exlantix-models')}
                    className="text-white text-xs hover:text-orange-400 transition-colors font-medium cursor-pointer py-2 flex items-center space-x-1 whitespace-nowrap"
                  >
                    <span>МОДЕЛИ EXLANTIX</span>
                    <svg 
                      className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'exlantix' ? 'rotate-180' : ''}`} 
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
                    <div className="bg-black/70 backdrop-blur-md rounded-lg shadow-2xl p-2 min-w-[200px] max-w-[250px]">
                      <div className="space-y-1">
                        <button
                          onClick={() => handleItemClick('/exlantix-es')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-xs">EXLANTIX ES</span>
                        </button>
                        
                        <button
                          onClick={() => handleItemClick('/exlantix-et')}
                          className="block w-full px-3 py-2 text-left text-white hover:text-orange-400 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                        >
                          <span className="text-xs">EXLANTIX ET</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Простые ссылки - сокращенные */}
                <button
                  onClick={() => handleNavigation('/test-drive')}
                  className="text-white text-xs hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  ТЕСТ-ДРАЙВ
                </button>
                
                <button
                  onClick={() => handleNavigation('/credit')}
                  className="text-white text-xs hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  КРЕДИТ
                </button>
                
                <button
                  onClick={() => handleNavigation('/trade-in')}
                  className="text-white text-xs hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  TRADE-IN
                </button>

                <button
                  onClick={() => handleNavigation('/dealers')}
                  className="text-white text-xs hover:text-orange-400 transition-colors font-medium py-2 whitespace-nowrap"
                >
                  ДИЛЕРЫ
                </button>
              </nav>
            )}

            {/* Контакты справа - для лаптопов и больших экранов */}
            {shouldShowContacts() && (
              <div className={`flex items-center space-x-3 xl:space-x-4 ${
                shouldShowMediumMenu() ? 'ml-6' : 
                shouldShowLaptopMenu() ? 'ml-4' : 
                'ml-auto'
              }`}>
                <div className={`flex flex-col space-y-1 items-start ${getContactsTextSize()}`}>
                  <div className="flex items-center space-x-1">
                    <svg className={`${screenSize === 'laptop-md' ? 'w-3 h-3' : 'w-3 h-3 xl:w-4 xl:h-4'} flex-shrink-0`} fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="leading-tight">
                      <span className="text-white font-medium block lg:inline">СОКОЛ-МОТОРС</span>
                      <span className="text-gray-300 block lg:inline lg:ml-1">— Пойменная, 1г</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className={`${screenSize === 'laptop-md' ? 'w-3 h-3' : 'w-3 h-3 xl:w-4 xl:h-4'} flex-shrink-0`} fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="leading-tight">
                      <span className="text-white font-medium block lg:inline">ПРАЙД</span>
                      <span className="text-gray-300 block lg:inline lg:ml-1">— Малиновского, 43</span>
                    </span>
                  </div>
                </div>

                <a 
                  href="tel:+78633203354"
                  className={`flex items-center space-x-1 hover:text-orange-400 transition-colors ${getContactsTextSize()}`}
                  onClick={(e) => {
                    try {
                      return true;
                    } catch (error) {
                      e.preventDefault();
                    }
                  }}
                >
                  <svg className={`${screenSize === 'laptop-md' ? 'w-3 h-3' : 'w-3 h-3 xl:w-4 xl:h-4'} flex-shrink-0`} fill="rgb(138, 138, 138)" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span className="font-semibold text-white whitespace-nowrap">+7 863 320-33-54</span>
                </a>

                <button
                  onClick={() => openModal('callback')}
                  className={`bg-exeed-gray hover:bg-white text-exeed-dark rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.03] whitespace-nowrap
                    ${
                      screenSize === 'laptop-md' || screenSize === 'desktop-sm'
                        ? 'px-3 py-1.5 text-tiny'
                        : screenSize === 'desktop' || screenSize === 'desktop-xl'
                        ? 'px-4 py-2 text-sm'
                        : 'px-2.5 py-1 text-xxs'
                    }`}
                >
                  Обратный звонок
                </button>
              </div>
            )}

            {/* Мобильные кнопки - только для размеров < 1280px */}
            {shouldShowMobileMenu() && (
              <div className="flex items-center space-x-3 ml-auto">
                <button 
                  onClick={() => openModal('callback')}
                  className="text-white hover:text-orange-400 transition-colors p-2 flex-shrink-0 flex items-center justify-center"
                  aria-label="Обратный звонок"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </button>

                <button 
                  onClick={toggleMenu}
                  className="text-white p-2 hover:text-orange-400 transition-colors flex-shrink-0 flex items-center justify-center"
                  aria-label="Открыть меню"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} onNavigate={handleNavigation} />
      </header>

      {/* Overlay для мобильного меню */}
      {isMenuOpen && shouldShowMobileMenu() && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Header;