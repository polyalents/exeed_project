import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection';
import DealersMapSection from '../components/DealersMapSection';
import apiService from '../services/api';
import { useModal } from '../context/ModalContext';

const HomePage = () => {
  const [models, setModels] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

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

  // Компонент карточки модели - ИСПРАВЛЕННАЯ АДАПТИВНОСТЬ
  const ModelCard = ({ model, index, isExlantix = false }) => (
    <div className={`grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[600px] lg:min-h-[800px] ${
      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
    }`}>
      {/* Изображение */}
      <div className={`order-1 lg:order-none ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
        <img
          src={model.image}
          alt={model.name}
          className="w-full h-full object-cover min-h-[300px] lg:min-h-[800px]"
          loading="lazy"
        />
      </div>
      
      {/* Контент */}
      <div className={`order-2 lg:order-none min-h-[400px] lg:min-h-[800px] flex flex-col justify-center px-6 py-8 lg:px-12 lg:py-16 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
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
              switch(model.name) {
                case 'EXEED LX': return 'Выгода до 610 000 ₽';
                case 'EXEED TXL': return 'Выгода до 650 000 ₽';
                case 'EXEED RX': return 'Выгода до 900 000 ₽';
                case 'EXEED VX': return 'Выгода до 1 475 000 ₽';
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
                  return 'Новый TXL создан для тех, кто двигается в ногу со временем. Среднеразмерный премиальный внедорожник с интеллектуальным полным приводом.';
                case 'EXEED RX': 
                  return 'EXEED RX представляет новое поколение автомобилей бренда. Инновационные решения обеспечивают высочайший комфорт.';
                case 'EXEED VX': 
                  return 'Обновлённый EXEED VX отличается высочайшим вниманием к деталям: отделка материалами премиального качества.';
                case 'EXLANTIX ET': 
                  return 'EXLANTIX ET — это технологическая платформа будущего с интуитивно понятным интерфейсом.';
                case 'EXLANTIX ES': 
                  return 'Гибридное четырехдверное купе EXLANTIX ES с почти полностью стеклянной крышей.';
                default: 
                  return 'Откройте для себя новые возможности с автомобилями EXEED и EXLANTIX.';
              }
            })()}
          </p>
        </div>
        
        {/* Особенности */}
        <div className="space-y-2 mb-4 lg:mb-6">
          {(() => {
            switch(model.name) {
              case 'EXEED LX': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Системы ADAS и камера 540°</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Система помощи в пробках</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Адаптивное переключение света</span>
                    </div>
                  </>
                );
              case 'EXEED TXL': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Интеллектуальный полный привод</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Автоматическая коробка передач</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Сиденья с массажем и вентиляцией</span>
                    </div>
                  </>
                );
              case 'EXEED RX': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Более 20 ассистентов ADAS</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Адаптивный круиз-контроль</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Система мониторинга слепых зон</span>
                    </div>
                  </>
                );
              case 'EXEED VX': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Отделка натуральными материалами</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Платформа M3X с усиленным кузовом</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Переработанная подвеска</span>
                    </div>
                  </>
                );
              case 'EXLANTIX ET': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Интуитивно понятный интерфейс</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Мощные аналитические инструменты</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Высокий уровень безопасности</span>
                    </div>
                  </>
                );
              case 'EXLANTIX ES': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">Полностью стеклянная крыша</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">88% алюминиевый сплав</span>
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
        <p className="font-bold text-gray-900 inline-block border-b-4 border-orange-400 pb-1" style={{ fontSize: "1.8em" }}>
          {model.price}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <HeroSection />

      {/* EXEED Models Section */}
      <section id="exeed-models" className="py-12 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center space-x-2 lg:space-x-4 mb-6">
              <div className="w-8 lg:w-12 h-1 bg-orange-500"></div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-black px-2 text-center leading-tight">
                ЛЕГЕНДАРНЫЕ С 2010 ГОДА
              </h2>
              <div className="w-8 lg:w-12 h-1 bg-orange-500"></div>
            </div>
            <p className="text-base lg:text-xl text-gray-700 max-w-4xl mx-auto px-4">
              Присоединитесь к нам, чтобы отметить самое знаковое имя в истории китайских автомобилей EXEED. 
              От первой модели в 2018 году до современной линейки, включающей высокотехнологичные кроссоверы.
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
      <section id="exlantix-models" className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
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
      <section id="test-drive" className="py-12 lg:py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 lg:space-x-4 mb-6">
            <div className="w-8 lg:w-12 h-1 bg-orange-500"></div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-heading font-bold text-black px-2 text-center leading-tight">
              ИСПЫТАЙТЕ ЧИСТУЮ ПРОИЗВОДИТЕЛЬНОСТЬ
            </h2>
            <div className="w-8 lg:w-12 h-1 bg-orange-500"></div>
          </div>
          <p className="text-base lg:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Наша линейка высокопроизводительных кроссоверов устанавливает стандарт для повседневной 
            эпической спортивной езды. Модели EXEED и EXLANTIX предлагают захватывающие поездки.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <button 
              onClick={() => openModal('callback')} 
              className="bg-orange-500 hover:bg-orange-600 text-white text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-colors duration-300 flex-1"
            >
              Записаться на тест-драйв
            </button>
            <button 
              onClick={() => openModal('callback')} 
              className="bg-white hover:bg-black text-black hover:text-white border-2 border-black text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 flex-1"
            >
              Узнать больше
            </button>
          </div>
        </div>
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

      {/* Разделитель между секциями */}
      <div className="relative w-full flex justify-center items-center my-8 lg:my-12">
        <div className="w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
      </div>

      {/* Trade-In Section */}
      <section id="trade-in" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-1 bg-orange-500"></div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-black">
                ОБМЕН СТАРОГО АВТО НА НОВЫЙ
              </h2>
              <div className="w-12 h-1 bg-orange-500"></div>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Обменяйте ваш автомобиль на новый EXEED или EXLANTIX с максимальной выгодой. 
              Честная оценка, прозрачные условия, быстрое оформление.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Левая колонка - преимущества */}
            <div className="space-y-6 bg-white rounded-2xl shadow-md p-6 lg:p-10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Честная оценка</h3>
                  <p className="text-gray-700">Профессиональная оценка вашего автомобиля по рыночной стоимости с учетом всех особенностей</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Быстрое оформление</h3>
                  <p className="text-gray-700">Все документы оформляем за один день. Минимум бюрократии — максимум удобства</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Максимальная выгода</h3>
                  <p className="text-gray-700">Дополнительная скидка при обмене + зачет полной стоимости вашего автомобиля</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Любое состояние</h3>
                  <p className="text-gray-700">Принимаем автомобили в любом техническом состоянии. Даже после ДТП</p>
                </div>
              </div>

              <div className="pt-6 flex justify-center">
                <button 
                  onClick={() => openModal('callback')}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
                >
                  Оценить мой автомобиль
                </button>
              </div>
            </div>

            {/* Правая колонка - карточка Trade-In */}
            <div className="relative">
              <div 
                className="rounded-2xl p-8 text-white"
                style={{ backgroundColor: 'rgb(45, 44, 44)' }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h4c.55 0 1 .45 1 1s-.45 1-1 1h-1v14c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6H3c-.55 0-1-.45-1-1s.45-1 1-1h4zM9 3v1h6V3H9zm7 3H8v13h8V6z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Trade-In за 30 минут</h3>
                  <p className="text-lg opacity-90">Приезжайте с документами — уезжайте на новом авто</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span>Бесплатная оценка</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span>Выбор новой модели</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span>Оформление документов</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <span>Получение нового авто</span>
                  </div>
                </div>
                {/* Блок скидки — теперь оранжевый */}
                <button 
                  onClick={() => openModal('callback')}
                  className="mt-8 w-full p-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-center text-white transition-colors duration-300"
                >
                  <p className="text-lg font-semibold mb-1">Дополнительная скидка</p>
                  <p className="text-3xl font-bold">до 200 000 ₽</p>
                  <p className="text-sm opacity-90">при обмене по Trade-In</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dealers Section */}
      <DealersMapSection dealers={dealers} />
    </div>
  );
};

export default HomePage;