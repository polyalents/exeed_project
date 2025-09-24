// src/components/MobileMenu.jsx
import React from 'react';
import { useModal } from '../../context/ModalContext';

const MobileMenu = ({ isOpen, onClose }) => {
  const { openModal } = useModal();

  const handleLinkClick = (callback) => {
    if (callback) callback(); // если передали действие — выполняем
    onClose(); // потом закрываем меню
  };

  return (
    <div
      className={`xl:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-exeed-header border-t border-gray-600`}
    >
      <nav className="px-8 sm:px-12 py-6 space-y-1 text-center">
        {/* EXEED */}
        <a
          href="#models"
          onClick={onClose}
          className="block text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          EXEED
        </a>
        <div className="flex items-center justify-center py-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>

        {/* EXLANTIX */}
        <a
          href="#models"
          onClick={onClose}
          className="block text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          EXLANTIX
        </a>
        <div className="flex items-center justify-center py-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>

        {/* ТЕСТ-ДРАЙВ → открывает модалку */}
        <button
          onClick={() => handleLinkClick(() => openModal('callback'))}
          className="w-full block text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          ТЕСТ-ДРАЙВ
        </button>
        <div className="flex items-center justify-center py-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>

        {/* TRADE-IN */}
        <button
          onClick={() => handleLinkClick(() => openModal('callback'))}
          className="w-full block text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          TRADE-IN
        </button>
        <div className="flex items-center justify-center py-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>

        {/* КРЕДИТ → тоже модалка */}
        <button
          onClick={() => handleLinkClick(() => openModal('callback'))}
          className="w-full block text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          КРЕДИТ
        </button>
        <div className="flex items-center justify-center py-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        </div>

        {/* ДИЛЕРЫ */}
        <a
          href="#dealers"
          onClick={onClose}
          className="block text-white text-base font-medium py-3 hover:text-orange-400 transition-all"
        >
          ДИЛЕРЫ
        </a>

        {/* Контакты */}
        <div className="pt-6 mt-6 border-t border-gray-600 space-y-4">
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="rgb(138, 138, 138)"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>Ростов-на-Дону, ул. Пойменная, 1г</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="rgb(138, 138, 138)"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>Ростов-на-Дону, ул. Малиновского, 43</span>
            </div>
          </div>

          {/* Телефон */}
          <div className="pt-2">
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
