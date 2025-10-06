import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from "../components/Footer/Footer";
import HeroSection from '../components/HeroSection';
import DealersMapSection from '../components/DealersMapSection';
import apiService from '../services/api';
import { useModal } from '../context/ModalContext';
import ReCAPTCHA from "react-google-recaptcha";

const HomePage = ({ scrollTo }) => {
  const [models, setModels] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  // Состояния и обработчики для формы тест-драйва
  const [formData, setFormData] = useState({ phone: "" });
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const phoneNumbers = formData.phone.replace(/\D/g, "");

    if (phoneNumbers.length !== 11) {
      newErrors.phone = "Введите корректный номер телефона";
    } else {
      const firstDigitAfter7 = phoneNumbers.charAt(1);
      if (!["8", "9"].includes(firstDigitAfter7)) {
        newErrors.phone = "Номер должен начинаться с +7 8__ или +7 9__";
      }
    }

    if (!captcha) newErrors.captcha = "Подтвердите, что вы не робот";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // имитация успешной отправки (например, await apiService.sendLead(formData))
    setShowSuccess(true);
    setIsSubmitted(true);

    // очистка ошибок и капчи
    setErrors({});
    setCaptcha(null);
  };

  const resetAndRefresh = () => {
    setFormData({ phone: "" });
    setCaptcha(null);
    setErrors({});
    setIsSubmitted(false);
    setShowSuccess(false);
  };

  // Единственный useEffect для скролла - срабатывает при изменении scrollTo
  useEffect(() => {
    if (!scrollTo) return;
    
    const element = document.getElementById(scrollTo);
    if (!element) return;
    
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, [scrollTo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modelsRes, dealersRes] = await Promise.all([
          apiService.getModels(),
          apiService.getDealers()
        ]);
        console.log('Loaded models:', modelsRes.data);
        setModels(modelsRes.data);
        setDealers(dealersRes.data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Разделяем модели по брендам
  const exeedModels = models.filter(model => model.brand === 'EXEED');
  const exlantixModels = models.filter(model => model.brand === 'EXLANTIX');

  // Компонент для overlay характеристик
  const ModelSpecsOverlay = ({ model }) => {
    const getModelSpecs = (modelName) => {
      switch (modelName) {
        case 'EXEED LX':
          return { power: '150 л.с.', acceleration: '11.2 с', consumption: '7.7 л', drive: 'AWD' };
        case 'EXEED TXL':
          return { power: '197 л.с.', acceleration: '9.8 с', consumption: '8.2 л', drive: 'AWD' };
        case 'EXEED RX':
          return { power: '254 л.с.', acceleration: '7.9 с', consumption: '7.8 л', drive: 'AWD' };
        case 'EXEED VX':
          return { power: '290 л.с.', acceleration: '7.1 с', consumption: '9.1 л', drive: 'AWD' };
        case 'EXLANTIX ET':
          return { power: '408 л.с.', acceleration: '4.3 с', torque: '634 Нм', range: '1180 км' };
        case 'EXLANTIX ES':
          return { power: '365 л.с.', acceleration: '4.9 с', torque: '634 Нм', range: '1231 км' };
        default:
          return { power: '150 л.с.', acceleration: '8.5 с', consumption: '7.5 л', drive: 'AWD' };
      }
    };

    const specs = getModelSpecs(model.name);
    const isExlantix = model.name?.startsWith('EXLANTIX');

    const icons = {
      power: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-400" fill="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      acceleration: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-400" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      consumption: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-400" fill="currentColor">
          <path d="M12 2.5C8.5 2.5 5.5 5.3 5.5 8.8 5.5 13.2 12 21.5 12 21.5s6.5-8.3 6.5-12.7C18.5 5.3 15.5 2.5 12 2.5Z" />
        </svg>
      ),
      drive: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-400" fill="none">
          <rect x="3" y="11" width="18" height="2" fill="currentColor" />
          <circle cx="7" cy="16" r="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="17" cy="16" r="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="7" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="17" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      torque: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 text-orange-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="6.5" />
          <rect x="11" y="1.5" width="2" height="4" rx="0.6" />
          <rect x="11" y="1.5" width="2" height="4" rx="0.6" transform="rotate(45 12 12)" />
          <rect x="11" y="1.5" width="2" height="4" rx="0.6" transform="rotate(90 12 12)" />
          <rect x="11" y="1.5" width="2" height="4" rx="0.6" transform="rotate(135 12 12)" />
          <rect x="11" y="1.5" width="2" height="4" rx="0.6" transform="rotate(180 12 12)" />
          <rect x="11" y="1.5" width="2" height="4" rx="0.6" transform="rotate(225 12 12)" />
          <rect x="11" y="1.5" width="2" height="4" rx="0.6" transform="rotate(270 12 12)" />
          <rect x="11" y="1.5" width="2" height="4" rx="0.6" transform="rotate(315 12 12)" />
        </svg>
      ),
      range: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-400" fill="none">
          <path
            d="M12 2C7 8 5 10 5 14a7 7 0 0014 0c0-4-2-6-7-12z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    };

    const items = isExlantix
      ? [
          { key: 'power', label: 'Мощность', value: specs.power, icon: icons.power },
          { key: 'acceleration', label: 'до 100 км/ч', value: specs.acceleration, icon: icons.acceleration },
          { key: 'torque', label: 'Крутящий момент', value: specs.torque, icon: icons.torque },
          { key: 'range', label: 'Запас хода', value: specs.range, icon: icons.range },
        ]
      : [
          { key: 'power', label: 'Мощность', value: specs.power, icon: icons.power },
          { key: 'acceleration', label: 'до 100 км/ч', value: specs.acceleration, icon: icons.acceleration },
          { key: 'consumption', label: 'Расход', value: specs.consumption, icon: icons.consumption },
          { key: 'drive', label: 'Привод', value: specs.drive, icon: icons.drive },
        ];

    return (
      <div
        className="
          absolute bottom-0 left-0 right-0
          bg-gradient-to-t from-black/80 via-black/30 to-transparent
          backdrop-blur-md
          px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-6
          pointer-events-none
        "
      >
        {/* ПК */}
        <div className="hidden md:flex justify-center items-center gap-10 lg:gap-16 text-white">
          {items.map((item) => (
            <div key={item.key} className="flex flex-col items-center group transition-all">
              <div className="mb-2 group-hover:scale-110 transition-transform duration-200">{item.icon}</div>
              <div className="text-xs text-gray-300 uppercase tracking-wider">{item.label}</div>
              <div className="text-lg font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Мобильная версия */}
        <div className="flex justify-between items-end text-white md:hidden px-2 py-2 text-[9px] leading-tight">
          {items.map((item) => (
            <div 
              key={item.key} 
              className="flex flex-col items-center justify-end flex-1 min-w-0 text-center space-y-[2px]"
            >
              <div className="w-5 h-5 flex items-center justify-center text-orange-400">
                {React.cloneElement(item.icon, { className: 'w-5 h-5 text-orange-400' })}
              </div>
              <div className="text-[8px] text-gray-300 uppercase tracking-wider">{item.label}</div>
              <div className="text-[10px] font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Компонент карточки модели
  const ModelCard = ({ model, index, isExlantix = false }) => (
    <div className={`homepage-model-card ${
      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
    }`}>
      {/* Изображение с overlay характеристик */}
      <div className={`order-1 lg:order-none ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
        <div className="homepage-model-image-fullwidth relative">
          <img
            src={model.image}
            alt={model.name}
            className="homepage-model-image"
            loading="lazy"
          />
          <ModelSpecsOverlay model={model} />
        </div>
      </div>
      
      {/* Контент */}
      <div className={`homepage-model-content order-2 lg:order-none ${
        index % 2 === 1 ? 'lg:col-start-1' : ''
      }`}>
        {/* Заголовок с вертикальной полоской */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3 lg:space-x-4">
            <div className="w-1 h-12 lg:h-16 bg-orange-500 mt-1"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm lg:text-lg font-semibold text-gray-600 mb-2 leading-tight">
                {(() => {
                  switch(model.name) {
                    case 'EXEED LX': return 'Компактный премиальный внедорожник';
                    case 'EXEED TXL': return 'Премиальный среднеразмерный внедорожник';
                    case 'EXEED RX': return 'Новое поколение премиум класса';
                    case 'EXEED VX': return 'Полноразмерный внедорожник';
                    case 'EXLANTIX ET': return 'Технологическая платформа будущего';
                    case 'EXLANTIX ES': return 'Гибридное четырехдверное купе';
                    default: return 'Инновационный автомобиль';
                  }
                })()}
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-black leading-tight break-words">
                {(() => {
                  switch(model.name) {
                    case 'EXEED LX': return 'НОВЫЙ EXEED LX';
                    case 'EXEED TXL': return 'НОВЫЙ EXEED TXL';
                    case 'EXEED VX': return 'НОВЫЙ EXEED VX';
                    default: return model.name;
                  }
                })()}
              </h3>
            </div>
          </div>
        </div>
        
        {/* Выгода */}
        <div className="mt-4 lg:mt-6">
          <p className="text-base lg:text-lg font-semibold text-orange-500 mb-2">
            {(() => {
              const modelName = (model?.name || '').trim().toUpperCase();
              switch (modelName) {
                case 'EXEED LX FL': return 'Выгода до 610 000 ₽';
                case 'EXEED TXL FL': return 'Выгода до 650 000 ₽';
                case 'EXEED RX': return 'Выгода до 900 000 ₽';
                case 'EXEED VX FL': return 'Выгода до 1 475 000 ₽';
                case 'EXLANTIX ET': return 'Выгода до 300 000 ₽';
                case 'EXLANTIX ES': return 'Выгода до 300 000 ₽';
                default: return 'Специальные условия';
              }
            })()}
          </p>
          
          {/* Описание */}
          <p className="text-sm lg:text-lg text-gray-700 leading-relaxed mb-4 lg:mb-6">
            {(() => {
              switch(model.name) {
                case 'EXEED LX': 
                  return 'Новый EXEED LX — это компактный премиальный внедорожник, который сочетает в себе стильный дизайн, современные технологии и универсальность.';
                case 'EXEED TXL':
                  return 'EXEED TXL предлагает идеальное сочетание роскоши и практичности в среднеразмерном внедорожнике премиум-класса.';
                case 'EXEED RX':
                  return 'EXEED RX воплощает в себе новое поколение автомобилей премиум-класса с передовыми технологиями и элегантным дизайном.';
                case 'EXEED VX':
                  return 'EXEED VX — флагманский полноразмерный внедорожник, представляющий вершину инженерного мастерства и роскоши.';
                case 'EXLANTIX ET':
                  return 'EXLANTIX ET — электрический кроссовер будущего с революционными технологиями и экологичным подходом.';
                case 'EXLANTIX ES':
                  return 'EXLANTIX ES — гибридное четырехдверное купе, объединяющее элегантность и инновационные решения.';
                default: 
                  return 'Инновационный автомобиль с передовыми технологиями и премиальным качеством.';
              }
            })()}
          </p>
        </div>
        
        {/* Ключевые особенности */}
        <div className="space-y-3 mb-4 lg:mb-6">
          {(() => {
            switch(model.name) {
              case 'EXEED LX FL':
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Турбодвигатель 1.6L</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Полный привод AWD</span>
                    </div>
                  </>
                );
              case 'EXEED TXL FL':
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Двигатель 2.0T</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Панорамная крыша</span>
                    </div>
                  </>
                );
              case 'EXEED RX':
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Гибридная силовая установка</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Система ADAS</span>
                    </div>
                  </>
                );
              case 'EXEED VX FL':
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">V6 двигатель 3.0T</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Пневматическая подвеска</span>
                    </div>
                  </>
                );
              case 'EXLANTIX ET':
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Электрическая силовая установка</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Запас хода до 600 км</span>
                    </div>
                  </>
                );
              case 'EXLANTIX ES':
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Гибридная технология</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Снижение веса на 25%</span>
                    </div>
                  </>
                );
              default: 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Продвинутые технологии</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Премиальные материалы</span>
                    </div>
                  </>
                );
            }
          })()}
        </div>
        
        {/* Цена */}
        <div className="flex items-baseline gap-3 mt-4">
          <p className="text-2xl lg:text-3xl font-bold text-black">
            {model.price}
          </p>
          {(() => {
            switch (model.name) {
              case 'EXEED LX FL': return <span className="text-gray-500 line-through text-xl">2 790 000 ₽</span>;
              case 'EXEED TXL FL': return <span className="text-gray-500 line-through text-xl">3 600 000 ₽</span>;
              case 'EXEED RX': return <span className="text-gray-500 line-through text-xl">4 550 000 ₽</span>;
              case 'EXEED VX FL': return <span className="text-gray-500 line-through text-xl">6 040 000 ₽</span>;
              case 'EXLANTIX ET': return <span className="text-gray-500 line-through text-xl">6 600 000 ₽</span>;
              case 'EXLANTIX ES': return <span className="text-gray-500 line-through text-xl">5 990 000 ₽</span>;
              default: return null;
            }
          })()}
        </div>

        <hr className="border-t-2 border-orange-500 mt-3" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <HeroSection />

      {/* EXEED Models Section */}
      <section id="exeed-models" className="pt-12 lg:pt-20 pb-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center space-x-2 lg:space-x-4 mb-6">
              <div className="w-8 lg:w-12 h-1 bg-orange-500"></div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-black px-2 text-center leading-tight">
                ЛЕГЕНДАРНЫЕ С 2018 ГОДА
              </h2>
              <div className="w-8 lg:w-12 h-1 bg-orange-500"></div>
            </div>
            <p className="text-base lg:text-xl text-gray-700 max-w-4xl mx-auto px-4">
              EXEED – бренд премиальных автомобилей, созданных международной командой профессионалов. Создавая кроссоверы и внедорожники EXEED, мы стремимся поделиться с клиентом страстью к любимому делу, выражая ее через высочайшие технологии и безупречный дизайн.
            </p>
          </div>
          
          {loading ? (
            <div className="text-center text-black py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-4">Загрузка моделей EXEED...</p>
            </div>
          ) : (
            <div className="space-y-8 lg:space-y-0">
              {exeedModels.map((model, index) => (
                <div key={model.id} id={`exeed-${model.name.split(' ')[1]?.toLowerCase() || model.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <ModelCard 
                    model={model} 
                    index={index}
                    isExlantix={false}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EXLANTIX Models Section */}
      <section id="exlantix-models" className="-mt-8 pt-12 lg:pt-20 pb-0 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center space-x-2 lg:space-x-4 mb-6">
              <div className="w-8 lg:w-12 h-1 bg-orange-500"></div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-black px-2 text-center leading-tight">
                ЭЛЕКТРИЧЕСКИЕ РЕШЕНИЯ
              </h2>
              <div className="w-8 lg:w-12 h-1 bg-orange-500"></div>
            </div>
            <p className="text-base lg:text-xl text-gray-700 max-w-4xl mx-auto px-4">
              Познакомьтесь с первым полностью электрическим спорткаром. EXLANTIX продолжает 
              наследие инноваций с быстрым и экологичным ускорением и легкой маневренностью.
            </p>
          </div>
          
          {loading ? (
            <div className="text-center text-black py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-4">Загрузка моделей EXLANTIX...</p>
            </div>
          ) : (
            <div className="space-y-8 lg:space-y-0">
              {exlantixModels.sort((a, b) => {
                const priceA = parseFloat(a.price.replace(/[^\d.,]/g, '').replace(',', '.'));
                const priceB = parseFloat(b.price.replace(/[^\d.,]/g, '').replace(',', '.'));
                return priceA - priceB;
              }).map((model, index) => (
                <div key={model.id} id={`exlantix-${model.name.split(' ')[1]?.toLowerCase() || model.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <ModelCard 
                    model={model} 
                    index={index}
                    isExlantix={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Test Drive Section */}
      <section id="test-drive" className="py-20 bg-gradient-to-b from-[#ff9335] to-[#e86b1c] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Левая часть */}
          <div className="flex-1 flex flex-col items-center lg:items-start justify-center text-center lg:text-left space-y-8">
            <div className="hidden sm:flex items-center justify-center gap-4 mb-6">
              <img
                src="/static/images/testdrive/main-banner.webp"
                alt="Exeed Test Drive Road"
                className="w-[360px] h-[360px] object-cover rounded-lg shadow-md"
                loading="lazy"
              />
              <img
                src="/static/images/testdrive/secondary.webp"
                alt="Exeed App Experience"
                className="w-[200px] h-[200px] object-cover rounded-lg shadow-md"
                loading="lazy"
              />
            </div>

            <h2
              className="text-[46px] font-heading font-extrabold tracking-tight text-white text-center lg:text-left"
              style={{
                textShadow: `
                  0px 2px 4px rgba(0, 0, 0, 0.3),
                  0px 4px 8px rgba(0, 0, 0, 0.25),
                  0px 6px 12px rgba(0, 0, 0, 0.15)
                `,
              }}
            >
              ТЕСТ-ДРАЙВ
            </h2>
          </div>

          {/* Правая часть — форма */}
          <div className="flex-1 bg-white/95 text-black p-10 border border-gray-300 rounded-xl shadow-sm backdrop-blur-sm relative overflow-hidden">
            <h3 className="text-[30px] font-bold text-center mb-6 tracking-tight text-black">
              Пробная поездка
            </h3>
            <p className="text-sm text-gray-800 mb-6 text-center">
              Оставьте номер — наш специалист свяжется с вами и подберёт удобное время для поездки.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!validateForm()) return;
                setShowSuccess(true);
              }}
              className="space-y-6"
            >
              <div>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => {
                    let digits = e.target.value.replace(/\D/g, "");
                    if (digits.length > 11) digits = digits.slice(0, 11);

                    let formatted = "+7";
                    if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
                    if (digits.length >= 4) formatted += `) ${digits.slice(4, 7)}`;
                    if (digits.length >= 7) formatted += `-${digits.slice(7, 9)}`;
                    if (digits.length >= 9) formatted += `-${digits.slice(9, 11)}`;

                    setFormData({ phone: formatted });
                  }}
                  maxLength={18}
                  className="w-full border border-gray-300 rounded-md bg-white px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 font-mono tracking-wide"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="pt-2 w-full flex justify-center">
                <div className="inline-block w-full max-w-[100%] overflow-hidden">
                  <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={setCaptcha}
                  />
                </div>
              </div>
              {errors.captcha && (
                <p className="text-red-400 text-sm text-center">{errors.captcha}</p>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white py-3 font-semibold text-base rounded-md border border-black transition-all duration-500 hover:bg-white hover:text-black"
              >
                ЗАПИСАТЬСЯ НА ПОЕЗДКУ
              </button>

              <p className="text-xs text-gray-600 text-center leading-snug">
                Отправляя форму, вы соглашаетесь с{" "}
                <a href="#" className="underline hover:text-black transition-colors duration-200">
                  политикой обработки персональных данных
                </a>.
              </p>
            </form>
          </div>
        </div>

        {/* Всплывающее окно успеха */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]">
            <div className="bg-[#1f1f1f] text-white rounded-2xl px-8 py-10 max-w-sm w-[90%] text-center shadow-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Заявка успешно отправлена!</h3>
              <p className="text-gray-300 mb-6">Мы свяжемся с вами в ближайшее время.</p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setFormData({ phone: "" });
                  setCaptcha(null);
                  setErrors({});
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-semibold transition"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Credit Section */}
      <section id="credit" className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 lg:space-x-4 mb-6">
              <div className="w-8 lg:w-12 h-1 bg-orange-500"></div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-heading font-bold text-black px-2 text-center leading-tight">
                КРЕДИТ И РАССРОЧКА
              </h2>
              <div className="w-8 lg:w-12 h-1 bg-orange-500"></div>
            </div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* Карточка Авторассрочка */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200 flex flex-col">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-2 text-black">Авторассрочка</h3>
                <p className="text-2xl lg:text-3xl font-bold text-orange-500 mb-2">от 20 000 ₽</p>
                <p className="text-gray-600">в месяц без переплат</p>
              </div>

              <ul className="space-y-2 mb-6 text-sm text-gray-700 flex-grow">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                  Без первоначального взноса
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                  Быстрое оформление
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                  Гибкие условия
                </li>
              </ul>

              <button 
                onClick={() => openModal('callback')}
                className="mt-auto w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
              >
                Рассчитать рассрочку
              </button>
            </div>

            {/* Карточка Банковский кредит */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200 flex flex-col">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-2 text-black">Банковский кредит</h3>
                <p className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">от 5,9%</p>
                <p className="text-gray-600">годовых</p>
              </div>

              <ul className="space-y-2 mb-6 text-sm text-gray-700 flex-grow">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                  Низкая процентная ставка
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                  Срок до 7 лет
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                  Возможность досрочного погашения
                </li>
              </ul>

              <button 
                onClick={() => openModal('callback')}
                className="mt-auto w-full bg-gray-800 hover:bg-black text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
              >
                Подать заявку на кредит
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trade-in Section */}
      <section
        id="trade-in"
        className="relative py-16 bg-gradient-to-b from-[#ff9335] to-[#e86b1c] overflow-hidden scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start relative">

          {/* Левая часть */}
          <div className="relative flex-1 z-10">

            {/* Десктопный овал */}
            <svg
              className="absolute -top-8 -left-12 w-[400px] h-[140px] hidden xl:block"
              viewBox="0 0 400 140"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="200"
                cy="70"
                rx="180"
                ry="55"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1200"
                strokeDashoffset="1200"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="1200"
                  to="0"
                  dur="1.8s"
                  fill="freeze"
                  begin="0.3s"
                />
              </ellipse>
            </svg>

            {/* Мобильный овал */}
            <svg
              className="absolute -top-6 -left-8 w-[320px] h-[120px] xl:hidden block"
              viewBox="0 0 320 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="160"
                cy="60"
                rx="150"
                ry="50"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="1000"
                  to="0"
                  dur="1.8s"
                  fill="freeze"
                  begin="0.3s"
                />
              </ellipse>
            </svg>

            {/* Заголовок */}
            <div className="relative z-10 text-black uppercase leading-tight drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)] text-center lg:text-left">
              <h2 className="text-[28px] sm:text-[35px] lg:text-[40px] font-extrabold tracking-tight">ВЫГОДНЫЙ</h2>
              <h2 className="text-[48px] sm:text-[60px] lg:text-[72px] font-extrabold tracking-tight -mt-2">ОБМЕН</h2>
            </div>

            {/* Подзаголовок */}
            <div className="mt-8 text-[16px] sm:text-[18px] font-medium text-black leading-snug text-center lg:text-left">
              <p>
                вашего старого автомобиля<br />
                на новый кроссовер{" "}
                <span className="text-white font-extrabold relative inline-block">
                  EXEED
                  <svg
                    className="absolute left-0 bottom-[-5px] w-full"
                    height="4"
                    viewBox="0 0 100 4"
                  >
                    <line
                      x1="0"
                      y1="2"
                      x2="100"
                      y2="2"
                      stroke="black"
                      strokeWidth="4"
                      strokeDasharray="100"
                      strokeDashoffset="100"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="100"
                        to="0"
                        dur="0.5s"
                        fill="freeze"
                        begin="0.3s"
                      />
                    </line>
                  </svg>
                </span>{" "}
                или{" "}
                <span className="text-white font-extrabold relative inline-block">
                  EXLANTIX
                  <svg
                    className="absolute left-0 bottom-[-5px] w-full"
                    height="4"
                    viewBox="0 0 100 4"
                  >
                    <line
                      x1="0"
                      y1="2"
                      x2="100"
                      y2="2"
                      stroke="black"
                      strokeWidth="4"
                      strokeDasharray="100"
                      strokeDashoffset="100"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="100"
                        to="0"
                        dur="0.5s"
                        fill="freeze"
                        begin="0.9s"
                      />
                    </line>
                  </svg>
                </span>
              </p>
            </div>

            {/* Кнопка */}
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => openModal('callback')}
                className="mt-10 w-full max-w-md lg:w-[320px] h-[52px] rounded-md bg-black text-white text-[15px] font-semibold tracking-wide border border-transparent transition-all duration-300 hover:bg-white hover:text-black hover:border-black"
              >
                РАССЧИТАТЬ ТРЕЙД-ИН
              </button>
            </div>
          </div>

          {/* Правая часть */}
          <div className="flex-1 relative items-center justify-end hidden xl:flex">
            <h3 className="absolute text-[100px] font-extrabold uppercase text-black/10 select-none leading-none right-0">
              ТРЕЙД-ИН
            </h3>
            <img
              src="/static/images/models/ettraid.webp"
              alt="EXEED TXL Trade-In"
              className="relative z-10 w-[600px] h-auto mt-8 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>

        {/* Карточки */}
        <div className="max-w-7xl mx-auto mt-2 px-6 lg:px-12 hidden lg:block">
          <div className="grid grid-cols-5 gap-6">
            {[
              "Приезжайте на вашем автомобиле в дилерский центр",
              "Пройдите экспертную оценку состояния вашего автомобиля",
              "Выберите новый автомобиль, который вы хотели бы приобрести",
              "Доплатите разницу в стоимости старого и нового авто",
              "Забирайте ваш новый автомобиль",
            ].map((text, i) => (
              <div
                key={i}
                className="relative bg-[#2f2d2d] rounded-xl p-6 text-white h-[220px] shadow-md flex flex-col justify-end hover:translate-y-[-4px] transition-all duration-300"
              >
                <span className="absolute top-5 right-6 text-[95px] font-extrabold text-gray-400/25 leading-none select-none">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-snug font-medium w-[85%] z-10">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dealers Section */}
      <DealersMapSection dealers={dealers} />
      
      <Footer />
    </div>
  );
};

export default HomePage;