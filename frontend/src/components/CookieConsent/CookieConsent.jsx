// src/components/CookieConsent/CookieConsent.jsx
import React, { useEffect, useState } from "react";

const CookieConsent = ({ onConsent }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie_consent");
    if (savedConsent) {
      onConsent(savedConsent === "accepted");
    } else {
      setVisible(true);
    }
  }, [onConsent]);

  const handleChoice = (accept) => {
    const value = accept ? "accepted" : "rejected";
    localStorage.setItem("cookie_consent", value);
    onConsent(accept);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
        <p className="text-sm sm:text-base text-gray-200">
          Мы используем cookies для улучшения работы сайта и анализа трафика.
          Вы можете принять или отклонить использование cookies.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => handleChoice(false)}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Отклонить
          </button>
          <button
            onClick={() => handleChoice(true)}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
