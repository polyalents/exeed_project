// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ModalProvider } from "./context/ModalContext";
import Footer from "./components/Footer/Footer";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import Metrics from "./components/Metrics/Metrics";

// 🔥 Компонент для автоматического скролла к секциям (с оптимизацией)
const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTarget = location.pathname.replace("/", "");
    const sections = [
      "exeed-models", "exlantix-models", "exeed-lx", "exeed-txl", "exeed-rx",
      "exeed-vx", "exlantix-et", "exlantix-es", "credit", "test-drive",
      "trade-in", "dealers"
    ];

    if (!scrollTarget || !sections.includes(scrollTarget)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const scrollToSection = () => {
      const el = document.getElementById(scrollTarget);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
        return true;
      }
      return false;
    };

    // 🔹 увеличиваем задержку именно для exlantix
    const isExlantix = scrollTarget === "exlantix-models";
    let attempts = 0;
    const maxAttempts = isExlantix ? 50 : 30;
    const delay = isExlantix ? 400 : 200;

    const tryScroll = () => {
      const success = scrollToSection();
      if (!success && attempts < maxAttempts) {
        attempts++;
        requestAnimationFrame(tryScroll);
      }
    };

    requestAnimationFrame(() => {
      setTimeout(() => tryScroll(), delay);
    });
  }, [location.pathname]);

  return null;
};

function App() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem("cookie_consent");
    if (storedConsent === "accepted") setConsent(true);
    if (storedConsent === "rejected") setConsent(false);
  }, []);

  const handleConsent = (value) => {
    setConsent(value);
    localStorage.setItem("cookie_consent", value ? "accepted" : "rejected");
  };

  return (
    <Router>
      <ModalProvider>
        <ScrollHandler />
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Routes>
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
            </Routes>
          </main>

          <Footer />

          {consent === null && <CookieConsent onConsent={handleConsent} />}
        </div>

        {consent === true && <Metrics />}
      </ModalProvider>
    </Router>
  );
}

export default App;
