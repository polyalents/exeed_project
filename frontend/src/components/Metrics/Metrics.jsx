// src/components/Metrics/Metrics.jsx
import { useEffect } from "react";

const Metrics = () => {
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent !== "true") {
      return; // не грузим метрики без согласия
    }

    // ===== Яндекс.Метрика =====
    const ymId = import.meta.env.VITE_YANDEX_METRIKA_ID;
    if (ymId) {
      (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
        m[i].l = 1 * new Date();
        k = e.createElement(t);
        a = e.getElementsByTagName(t)[0];
        k.async = 1;
        k.src = r;
        a.parentNode.insertBefore(k, a);
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      window.ym(ymId, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,        // запись сессий
        ssr: true,             // серверный рендер
        ecommerce: "dataLayer" // e-commerce
      });
    }

    // ===== Google Analytics =====
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaId) {
      const gtagScript = document.createElement("script");
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);

      window.dataLayer = window.dataLayer || [];
      function gtag(){ window.dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", gaId);
    }

    // ===== VK Pixel =====
    const vkId = import.meta.env.VITE_VK_PIXEL_ID;
    if (vkId) {
      !(function () {
        const t = document.createElement("script");
        t.type = "text/javascript";
        t.async = true;
        t.src = "https://vk.com/js/api/openapi.js?169";
        t.onload = function () {
          if (window.VK && window.VK.Retargeting) {
            window.VK.Retargeting.Init(vkId);
            window.VK.Retargeting.Hit();
          }
        };
        document.head.appendChild(t);
      })();
    }

  }, []);

  return null; // ничего не рендерим
};

export default Metrics;
