// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import PolicyPage from "./pages/PolicyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPage from "./pages/CookiesPage";
import ConsentPage from "./pages/ConsentPage";

import { ModalProvider } from "./context/ModalContext";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import Metrics from "./components/Metrics/Metrics";
import Header from "./components/Header/Header";

/* ===========================
   Мягкий контролируемый скролл
=========================== */
const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    const sections = [
      "exeed-models",
      "exlantix-models",
      "exeed-lx",
      "exeed-txl",
      "exeed-rx",
      "exeed-vx",
      "exlantix-et",
      "exlantix-es",
      "credit",
      "test-drive",
      "trade-in",
      "dealers",
    ];

    // если это не секция, просто вверх (без дёрганья)
    if (!sections.includes(path)) {
      window.scrollTo({ top: 0 });
      return;
    }

    const tryScroll = () => {
      const el = document.getElementById(path);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    };

    // плавное ожидание рендера DOM
    setTimeout(() => {
      requestAnimationFrame(tryScroll);
    }, 250);
  }, [location.pathname]);

  return null;
};

/* ===========================
   Основное приложение
=========================== */
function App() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent");
    if (stored === "accepted") setConsent(true);
    if (stored === "rejected") setConsent(false);
  }, []);

  const handleConsent = (value) => {
    setConsent(value);
    localStorage.setItem("cookie_consent", value ? "accepted" : "rejected");
  };

  return (
    <Router>
      <ModalProvider>
        <Header />
        <ScrollHandler />

        <main className="flex-grow bg-gray-50">
          <Routes>
            {/* Главная и секции */}
            <Route path="/" element={<HomePage />} />
            <Route path="/exeed-models" element={<HomePage scrollTo="exeed-models" />} />
            <Route path="/exlantix-models" element={<HomePage scrollTo="exlantix-models" />} />
            <Route path="/exeed-lx" element={<HomePage scrollTo="exeed-lx" />} />
            <Route path="/exeed-txl" element={<HomePage scrollTo="exeed-txl" />} />
            <Route path="/exeed-rx" element={<HomePage scrollTo="exeed-rx" />} />
            <Route path="/exeed-vx" element={<HomePage scrollTo="exeed-vx" />} />
            <Route path="/exlantix-et" element={<HomePage scrollTo="exlantix-et" />} />
            <Route path="/exlantix-es" element={<HomePage scrollTo="exlantix-es" />} />
            <Route path="/credit" element={<HomePage scrollTo="credit" />} />
            <Route path="/test-drive" element={<HomePage scrollTo="test-drive" />} />
            <Route path="/trade-in" element={<HomePage scrollTo="trade-in" />} />
            <Route path="/dealers" element={<HomePage scrollTo="dealers" />} />

            {/* Правовые страницы */}
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/consent" element={<ConsentPage />} />
          </Routes>
        </main>

        {/* Cookie-баннер */}
        {consent === null && <CookieConsent onConsent={handleConsent} />}
        {/* Метрики */}
        {consent === true && <Metrics />}
      </ModalProvider>
    </Router>
  );
}

export default App;
