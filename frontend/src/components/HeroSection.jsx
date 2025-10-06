// src/components/HeroSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { initButtonAnimations } from '../utils/buttonAnimations';
import { useModal } from '../context/ModalContext';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const { openModal } = useModal();

  const heroSlides = [
    {
      image: '/static/images/hero/exeedlx.webp',
      alt: 'НОВЫЙ EXEED LX FL',
      subtitle: 'Флагманский кроссовер',
      warranty: '7 лет или 200 000 км',
      benefit1: '610 000 ₽ выгода на EXEED',
      benefit2: 'Авторассрочка от 20 000 ₽/месяц',
    },
    {
      image: '/static/images/hero/exeedtxl.webp',
      alt: 'НОВЫЙ EXEED TXL FL',
      subtitle: 'Современный кроссовер',
      warranty: '7 лет или 200 000 км',
      benefit1: '650 000 ₽ выгода на EXEED',
      benefit2: 'Ежемесячный платеж от 30 000 ₽/месяц',
    },
    {
      image: '/static/images/hero/rx.webp',
      alt: 'RX',
      subtitle: 'Прогрессивный SUV',
      warranty: '7 лет или 200 000 км',
      benefit1: '900 000 ₽ выгода на EXEED',
      benefit2: 'Ежемесячный платеж от 35 000 ₽/месяц',
    },
    {
      image: '/static/images/hero/vx.webp',
      alt: 'НОВЫЙ VX FL',
      subtitle: 'Флагман премиум-класса',
      warranty: '7 лет или 200 000 км',
      benefit1: '1 475 000 ₽ выгода на EXEED',
      benefit2: 'Ежемесячный платеж от 45 000 ₽/месяц',
    },
    {
      image: '/static/images/hero/exlantix-et.webp',
      alt: 'EXLANTIX ET',
      subtitle: 'Электрический кроссовер',
      warranty: '8 лет или 200 000 км',
      benefit1: '300 000 ₽ выгода на EXLANTIX',
      benefit2: null,
    },
    {
      image: '/static/images/hero/exlantix-es.webp',
      alt: 'EXLANTIX ES',
      subtitle: 'Электрический седан будущего',
      warranty: '8 лет или 200 000 км',
      benefit1: '300 000 ₽ выгода на EXLANTIX',
      benefit2: null,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }
    }, 5000);

    initButtonAnimations();
    return () => clearInterval(timer);
  }, [isDragging]);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    startX.current = clientX;
    currentX.current = clientX;
  };
  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    currentX.current = clientX;
  };
  const handleDragEnd = () => {
    if (!isDragging) return;
    const diff = currentX.current - startX.current;
    if (diff > 50) prevSlide();
    if (diff < -50) nextSlide();
    setIsDragging(false);
  };

  const slide = heroSlides[currentSlide];

  return (
    <div className="relative">
      <section
        className="hero-section relative select-none"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {/* Фон */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#3e4651]/40 to-[#1a1a1a]/60" />
            </div>
          ))}
        </div>

        {/* Лента */}
        <div
          className="absolute top-16 sm:top-20 lg:top-24 left-0 w-full z-40"
          style={{
            background: 'linear-gradient(90deg, rgba(255, 90, 0, 0.95) 0%, rgba(255, 169, 77, 0.9) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div className="py-3 px-4">
            <p className="text-center text-white font-bold text-base md:text-lg lg:text-xl uppercase tracking-wide drop-shadow-md">
              Официальные дилеры EXEED & EXLANTIX в Ростовской области
            </p>
          </div>
        </div>

        {/* Контент */}
        <div className="hero-content pt-[100px] md:pt-[120px] lg:pt-[18vh] xl:pt-[22vh]">
          <h1 className="hero-title">{slide.alt}</h1>
          <p className="hero-description">{slide.subtitle}</p>

          {/* Рекордные выгоды */}
          {(slide.benefit1 || slide.benefit2 || slide.warranty) && (
            <div className="hero-benefits">
              <p className="benefit-title">Рекордные выгоды до 30.09</p>
<ul className="benefits-list space-y-2 text-left leading-snug">
  {slide.benefit1 && (
    <li className="flex items-start gap-2">
      <span className="text-white">–</span>
      <span><strong>{slide.benefit1}</strong></span>
    </li>
  )}
  {slide.benefit2 && (
    <li className="flex items-start gap-2">
      <span className="text-white">–</span>
      <span><strong>{slide.benefit2}</strong></span>
    </li>
  )}
  <li className="flex items-start gap-2">
    <span className="text-white">–</span>
    <span><strong>Доп. оборудование</strong> в подарок!</span>
  </li>
  {slide.warranty && (
    <li className="flex items-start gap-2">
      <span className="text-white">–</span>
      <span><strong>Гарантия</strong> {slide.warranty}</span>
    </li>
  )}
</ul>

            </div>
          )}

          {/* Кнопка */}
          <div className="hero-buttons">
            <button
              onClick={() => openModal('callback')}
              className="js-button top-right hero-button mx-auto"
            >
              Записаться на тест-драйв
              <span className="border top"></span>
              <span className="border right"></span>
              <span className="border bottom"></span>
              <span className="border left"></span>
            </button>
          </div>
        </div>

        {/* Стрелки */}
        <button
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center z-20"
          onClick={prevSlide}
        >
          ‹
        </button>
        <button
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center z-20"
          onClick={nextSlide}
        >
          ›
        </button>

        {/* Индикаторы */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
