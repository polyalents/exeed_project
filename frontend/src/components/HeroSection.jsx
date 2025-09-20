import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      image: '/static/images/hero/hero-slide-1.jpg',
      title: 'EXEED LX',
      subtitle: 'Флагманский кроссовер'
    },
    {
      image: '/static/images/hero/hero-slide-2.jpg', 
      title: 'EXEED VX',
      subtitle: 'Премиальный седан'
    },
    {
      image: '/static/images/hero/hero-slide-3.jpg',
      title: 'EXLANTIX ES',
      subtitle: 'Электрическое будущее'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden pt-16 lg:pt-20">
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
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <div className="max-w-7xl mx-auto section-padding text-center">
          
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-heading font-bold mb-4">
              EXEED & EXLANTIX
            </h1>
            <p className="text-2xl md:text-3xl mb-8 opacity-90">
              Официальные дилеры в Ростовской области
            </p>
          </div>

          {/* Offers Block */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-exeed-gray">
              Рекордные выгоды до 30.09
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-lg md:text-xl">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl mb-2">💰</div>
                <div className="font-semibold text-white text-2xl mb-2">
                  1 475 000 ₽
                </div>
                <div>выгода на EXEED</div>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl mb-2">🚗</div>
                <div className="font-semibold text-white text-2xl mb-2">
                  от 20 000 ₽/мес
                </div>
                <div>авторассрочка</div>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl mb-2">🎁</div>
                <div className="font-semibold text-white text-2xl mb-2">
                  В подарок
                </div>
                <div>доп.оборудование</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#test-drive" className="bg-exeed-gray hover:bg-white text-exeed-dark font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 inline-block">
              Записаться на тест-драйв
            </a>
            <a href="#credit" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 inline-block">
              Рассчитать кредит
            </a>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-exeed-gray w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;