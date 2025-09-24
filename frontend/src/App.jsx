// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ModalProvider } from "./context/ModalContext";
import Footer from "./components/Footer/Footer";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import Metrics from "./components/Metrics/Metrics";

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
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
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
