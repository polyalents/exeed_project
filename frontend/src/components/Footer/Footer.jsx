// src/components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-exeed-header text-gray-300 pt-12 pb-6">
      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Основная сетка футера - ВСЕ БЛОКИ В ОДНУ СТРОКУ */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 gap-x-12">
          
          {/* ЛОГОТИП */}
          <div className="flex justify-center md:justify-start items-baseline">
            <img
              src="/static/images/logos/logo.webp"
              alt="EXEED & EXLANTIX"
              className="h-3 md:h-1.3 w-auto object-contain cursor-pointer transition-all duration-200"
            />
          </div>

          {/* МОДЕЛИ */}
          <div className="text-center md:text-left border-t border-gray-700 pt-4 mt-4 md:border-t-0 md:pt-0 md:mt-0">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">
              МОДЕЛИ
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#exeed-vx" className="hover:text-orange-400 transition-colors text-gray-300">
                  EXEED VX
                </a>
              </li>
              <li>
                <a href="#exeed-rx" className="hover:text-orange-400 transition-colors text-gray-300">
                  EXEED RX
                </a>
              </li>
              <li>
                <a href="#exeed-txl" className="hover:text-orange-400 transition-colors text-gray-300">
                  EXEED TXL
                </a>
              </li>
              <li>
                <a href="#exeed-lx" className="hover:text-orange-400 transition-colors text-gray-300">
                  EXEED LX
                </a>
              </li>
              <li>
                <a href="#exlantix-et" className="hover:text-orange-400 transition-colors text-gray-300">
                  EXLANTIX ET
                </a>
              </li>
              <li>
                <a href="#exlantix-es" className="hover:text-orange-400 transition-colors text-gray-300">
                  EXLANTIX ES
                </a>
              </li>
            </ul>
          </div>

          {/* ПОКУПАТЕЛЯМ */}
          <div className="text-center md:text-left border-t border-gray-700 pt-4 mt-4 md:border-t-0 md:pt-0 md:mt-0">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">
              ПОКУПАТЕЛЯМ
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#test-drive" className="hover:text-orange-400 transition-colors text-gray-300">
                  ТЕСТ-ДРАЙВ
                </a>
              </li>
              <li>
                <a href="#credit" className="hover:text-orange-400 transition-colors text-gray-300">
                  Кредит
                </a>
              </li>
              <li>
                <a href="#trade-in" className="hover:text-orange-400 transition-colors text-gray-300">
                  TRAID-IN
                </a>
              </li>
              <li>
                <a href="#dealers" className="hover:text-orange-400 transition-colors text-gray-300">
                  Дилеры
                </a>
              </li>
            </ul>
          </div>

          {/* ОФИЦИАЛЬНЫЕ ДИЛЕРЫ */}
          <div className="text-center md:text-left border-t border-gray-700 pt-4 mt-4 md:border-t-0 md:pt-0 md:mt-0">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">
              ОФИЦИАЛЬНЫЕ ДИЛЕРЫ
            </h3>
            
            <div className="space-y-4 text-sm">
              {/* Дилер 1 */}
              <div className="space-y-1">
                <p className="text-white font-medium">ДИЛЕР СОКОЛ-МОТОРС</p>
                <p className="text-gray-300">г. Ростов-на-Дону, ул. Пойменная, 1г</p>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                </div>
              </div>

              {/* Дилер 2 */}
              <div className="space-y-1">
                <p className="text-white font-medium">ДИЛЕР ПРАЙД</p>
                <p className="text-gray-300">г. Ростов-на-Дону, ул. Малиновского, 43</p>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                </div>
              </div>
            </div>
          </div>

          {/* ЧАСЫ РАБОТЫ */}
          <div className="text-center md:text-left border-t border-gray-700 pt-4 mt-4 md:border-t-0 md:pt-0 md:mt-0">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">
              ЧАСЫ РАБОТЫ
            </h3>
            <p className="text-gray-300 text-sm">Ежедневно с 8:00 до 20:00</p>
          </div>

          {/* ПРАВОВАЯ ИНФОРМАЦИЯ */}
          <div className="text-center md:text-left border-t border-gray-700 pt-4 mt-4 md:border-t-0 md:pt-0 md:mt-0">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">
              ПРАВОВАЯ ИНФОРМАЦИЯ
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/policy" 
                  className="hover:text-orange-400 transition-colors text-gray-300"
                >
                  Юридическая информация
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="hover:text-orange-400 transition-colors text-gray-300"
                >
                  Правила обработки персональных данных
                </Link>
              </li>
              <li>
                <Link 
                  to="/consent" 
                  className="hover:text-orange-400 transition-colors text-gray-300"
                >
                  Согласие на обработку персональных данных
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookies" 
                  className="hover:text-orange-400 transition-colors text-gray-300"
                >
                  Политика использования файлов Cookie
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя строка с копирайтом */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center md:flex md:items-center md:justify-between">
          <div className="text-xs text-gray-400 leading-relaxed mb-2 md:mb-0">
            © {new Date().getFullYear()} СОКОЛ-МОТОРС, ПРАЙД — официальные дилер EXEED & EXLANTIX в Ростовской области
          </div>
          <div className="text-xs text-gray-500">
            Предложение на сайте не является публичной офертой
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;