// src/components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-exeed-header text-gray-300 pt-12 pb-6">
      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-20 2xl:px-24">
        {/* Основная сетка футера */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 gap-x-12">
          {/* ЛОГОТИП */}
          <div className="flex justify-center md:justify-start items-baseline">
            <Link to="/">
              <img
                src="/static/images/logos/logo.webp"
                alt="EXEED & EXLANTIX"
                className="h-3 md:h-1.3 w-auto object-contain cursor-pointer transition-all duration-200"
              />
            </Link>
          </div>

          {/* МОДЕЛИ */}
          <div className="text-center md:text-left border-t border-gray-700 pt-4 mt-4 md:border-t-0 md:pt-0 md:mt-0">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">
              МОДЕЛИ
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/exeed-vx" className="hover:text-orange-400">EXEED VX</Link></li>
              <li><Link to="/exeed-rx" className="hover:text-orange-400">EXEED RX</Link></li>
              <li><Link to="/exeed-txl" className="hover:text-orange-400">EXEED TXL</Link></li>
              <li><Link to="/exeed-lx" className="hover:text-orange-400">EXEED LX</Link></li>
              <li><Link to="/exlantix-et" className="hover:text-orange-400">EXLANTIX ET</Link></li>
              <li><Link to="/exlantix-es" className="hover:text-orange-400">EXLANTIX ES</Link></li>
            </ul>
          </div>

          {/* ПОКУПАТЕЛЯМ */}
          <div className="text-center md:text-left border-t border-gray-700 pt-4 mt-4 md:border-t-0 md:pt-0 md:mt-0">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">
              ПОКУПАТЕЛЯМ
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/test-drive" className="hover:text-orange-400">Тест-драйв</Link></li>
              <li><Link to="/credit" className="hover:text-orange-400">Кредит</Link></li>
              <li><Link to="/trade-in" className="hover:text-orange-400">Trade-In</Link></li>
              <li><Link to="/dealers" className="hover:text-orange-400">Дилеры</Link></li>
            </ul>
          </div>

          {/* ОФИЦИАЛЬНЫЕ ДИЛЕРЫ */}
          <div className="text-center md:text-left border-t border-gray-700 pt-4 mt-4 md:border-t-0 md:pt-0 md:mt-0">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">
              ОФИЦИАЛЬНЫЕ ДИЛЕРЫ
            </h3>
            <div className="space-y-4 text-sm">
              <div className="space-y-1">
                <p className="text-white font-medium">ДИЛЕР СОКОЛ-МОТОРС</p>
                <p className="text-gray-300">Ростов-на-Дону, ул. Пойменная, 1г</p>
              </div>
              <div className="space-y-1">
                <p className="text-white font-medium">ДИЛЕР ПРАЙД</p>
                <p className="text-gray-300">Ростов-на-Дону, ул. Малиновского, 43</p>
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
              <li><Link to="/policy" className="hover:text-orange-400">Юридическая информация</Link></li>
              <li><Link to="/terms" className="hover:text-orange-400">Правила обработки данных</Link></li>
              <li><Link to="/consent" className="hover:text-orange-400">Согласие на обработку</Link></li>
              <li><Link to="/cookies" className="hover:text-orange-400">Политика Cookie</Link></li>
            </ul>
          </div>
        </div>

        {/* Нижняя полоса */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center md:flex md:items-center md:justify-between">
          <div className="text-xs text-gray-400 leading-relaxed mb-2 md:mb-0">
            © {new Date().getFullYear()} СОКОЛ-МОТОРС, ПРАЙД — официальные дилеры EXEED & EXLANTIX в Ростовской области
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
