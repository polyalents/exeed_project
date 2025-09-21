import React, { useState, useEffect } from 'react';
import { initButtonAnimations } from '../utils/buttonAnimations';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      image: '/static/images/hero/exeedlx.webp',
      title: 'EXEED LX',
      subtitle: 'Флагманский кроссовер',
      alt: 'EXEED LX'
    },
    {
      image: '/static/images/hero/hero-slide-2.jpg', 
      title: 'EXEED VX',
      subtitle: 'Премиальный седан',
      alt: 'EXEED VX'
    },
    {
      image: '/static/images/hero/hero-slide-3.jpg',
      title: 'EXLANTIX ES',
      subtitle: 'Электрическое будущее',
      alt: 'EXLANTIX ES'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    // Инициализируем анимации кнопок
    initButtonAnimations();
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-exeed-dark"
              style={{ 
                backgroundImage: `linear-gradient(rgba(62,70,81,0.4), rgba(26,26,26,0.6)), url(${slide.image})`
              }}
              role="img"
              aria-label={slide.alt}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="hero-content">
        {/* Заголовок сверху слева */}
        <p className="hero-subtitle">Официальные дилеры в Ростовской области</p>
        <h1 className="hero-title">{heroSlides[currentSlide].title}</h1>
        
        {/* Блок преимуществ */}
        <div className="hero-benefits">
          <p className="benefit-title">Рекордные выгоды до 30.09</p>
          <ul className="benefits-list">
            <li><strong>1 475 000 ₽</strong> выгода на EXEED</li>
            <li><strong>от 20 000 ₽/мес</strong> авторассрочка</li>
            <li><strong>В подарок</strong> доп.оборудование</li>
          </ul>
        </div>

        {/* Кнопки с анимированными рамками */}
        <div className="hero-buttons">
          <a href="#test-drive" className="js-button top-right hero-button">
            Записаться на тест-драйв
            <span className="border top"></span>
            <span className="border right"></span>
            <span className="border bottom"></span>
            <span className="border left"></span>
          </a>
          <a href="#models" className="js-button bottom-left hero-button">
            Подробнее
            <span className="border top"></span>
            <span className="border right"></span>
            <span className="border bottom"></span>
            <span className="border left"></span>
          </a>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {heroSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            aria-label={`Слайд ${index + 1}: ${slide.title}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;