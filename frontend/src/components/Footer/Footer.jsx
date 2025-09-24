// src/components/Footer/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-exeed-header text-gray-300 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} EXEED & EXLANTIX. Все права защищены.
        </p>
        <div className="flex space-x-4">
          <a href="#policy" className="hover:text-orange-400 text-sm">
            Политика конфиденциальности
          </a>
          <a href="#terms" className="hover:text-orange-400 text-sm">
            Условия использования
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
