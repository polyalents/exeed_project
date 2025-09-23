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

  // Компонент карточки модели - РАСТЯНУТАЯ ВЫСОТА И СУЖЕННЫЙ ОБЩИЙ КОНТЕЙНЕР
  const ModelCard = ({ model, index, isExlantix = false }) => (
    <div className={`grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[800px] ${
      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
    }`}>
      {/* Изображение - ВОЗВРАТ К 50/50 */}
      <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
        <img
          src={model.image}
          alt={model.name}
          className="w-full h-full object-cover min-h-[800px]"
          loading="lazy"
        />
      </div>
      
      {/* Контент - ВОЗВРАТ К 50/50 */}
      <div className={`min-h-[800px] flex flex-col justify-center px-12 py-16 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
        {/* Заголовок с вертикальной полоской */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-1 h-16 bg-orange-500"></div>
            <div>
              <p className="text-lg font-semibold text-gray-600 mb-2">
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
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-black leading-tight">
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
        <div>
          <p className="text-lg font-semibold text-orange-500 mb-2">
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
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {(() => {
              switch(model.name) {
                case 'EXEED LX': 
                  return 'Новый EXEED LX — это компактный премиальный внедорожник, который сочетает в себе стильный дизайн, современные технологии и универсальность.';
                case 'EXEED TXL': 
                  return 'Новый TXL создан для тех, кто двигается в ногу со временем, постоянно стремится к большему, имеет волю к победам и свершениям. Для кого вызов – это смысл жизни. Среднеразмерный премиальный внедорожник с интеллектуальным полным приводом.';
                case 'EXEED RX': 
                  return 'EXEED RX представляет новое поколение автомобилей бренда, являясь ярким воплощением концепции «Искусство технологий». Инновационные дизайнерские и технологичные решения обеспечивают высочайший комфорт.';
                case 'EXEED VX': 
                  return 'Созданный международной командой в дизайн-центре EXEED в Мюнхене, обновлённый EXEED VX отличается высочайшим вниманием к деталям: отделка материалами премиального качества, включая натуральное дерево и кожу.';
                case 'EXLANTIX ET': 
                  return 'EXLANTIX ET — это технологическая платформа, предназначенная для анализа и обработки данных с акцентом на автоматизацию бизнес-процессов. Она предлагает интуитивно понятный интерфейс и мощные аналитические инструменты.';
                case 'EXLANTIX ES': 
                  return 'Гибридное четырехдверное купе EXLANTIX ES подарит вам настоящие драйверские ощущения в комфортном салоне с почти полностью стеклянной крышей, а колоссальный запас хода позволит вам ощутить истинную свободу движения.';
                default: 
                  return 'Откройте для себя новые возможности с автомобилями EXEED и EXLANTIX.';
              }
            })()}
          </p>
        </div>
        
        {/* Особенности */}
        <div className="space-y-2">
          {(() => {
            switch(model.name) {
              case 'EXEED LX': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Системы ADAS и камера кругового обзора 540°</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Система помощи в пробках и адаптивный круиз</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Адаптивное переключение света и система предупреждения</span>
                    </div>
                  </>
                );
              case 'EXEED TXL': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Интеллектуальный полный привод</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Роботизированная или автоматическая коробка передач</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Сиденья с функциями массажа и вентиляции</span>
                    </div>
                  </>
                );
              case 'EXEED RX': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Более 20 ассистентов водителя ADAS</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Адаптивный круиз с системой помощи в пробках</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Система мониторинга слепых зон и ассистент дверей</span>
                    </div>
                  </>
                );
              case 'EXEED VX': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Отделка натуральным деревом и кожей премиум-класса</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Собственная платформа M3X с усиленным кузовом</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Переработанная система подвески</span>
                    </div>
                  </>
                );
              case 'EXLANTIX ET': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Интуитивно понятный интерфейс</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Мощные аналитические инструменты</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Высокий уровень безопасности данных</span>
                    </div>
                  </>
                );
              case 'EXLANTIX ES': 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Почти полностью стеклянная крыша</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Кузов на 88% из алюминиевого сплава</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Снижение веса на 25% и увеличенная жесткость</span>
                    </div>
                  </>
                );
              default: 
                return (
                  <>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Продвинутые технологии</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Премиальные материалы</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Инновационный дизайн</span>
                    </div>
                  </>
                );
            }
          })()}
        </div>
        
        {/* Цена */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Цена от</p>
          <p className="text-2xl font-bold text-black">
            {model.price}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      {/* EXEED Models Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-1 bg-orange-500"></div>
              <h2 className="text-4xl sm:text-5xl font-heading font-bold text-black">
                ЛЕГЕНДАРНЫЕ С 2010 ГОДА
              </h2>
              <div className="w-12 h-1 bg-orange-500"></div>
            </div>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
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
            <div className="space-y-0">
              {exeedModels.map((model, index) => (
                <ModelCard 
                  key={model.id} 
                  model={model} 
                  index={index}
                  isExlantix={false}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EXLANTIX Models Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-1 bg-orange-500"></div>
              <h2 className="text-4xl sm:text-5xl font-heading font-bold text-black">
                ЭЛЕКТРИЧЕСКИЕ РЕШЕНИЯ
              </h2>
              <div className="w-12 h-1 bg-orange-500"></div>
            </div>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Познакомьтесь с первым полностью электрическим спорткаром. EXLANTIX e-1 ABS продолжает 
              наследие инноваций с быстрым и экологичным ускорением и легкой маневренностью в дружелюбном пакете.
            </p>
          </div>
          
          {loading ? (
            <div className="text-center text-black py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-4">Загрузка моделей EXLANTIX...</p>
            </div>
          ) : (
            <div className="space-y-0">
              {exlantixModels.sort((a, b) => {
                // Сортируем по цене - ES (5.99) первый, ET (6.6) второй
                const priceA = parseFloat(a.price.replace(/[^\d.,]/g, '').replace(',', '.'));
                const priceB = parseFloat(b.price.replace(/[^\d.,]/g, '').replace(',', '.'));
                return priceA - priceB;
              }).map((model, index) => (
                <ModelCard 
                  key={model.id} 
                  model={model} 
                  index={index}
                  isExlantix={true}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Test Drive Section */}
      <section id="test-drive" className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-1 bg-orange-500"></div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-black">
              ИСПЫТАЙТЕ ЧИСТУЮ ПРОИЗВОДИТЕЛЬНОСТЬ
            </h2>
            <div className="w-12 h-1 bg-orange-500"></div>
          </div>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Наша линейка высокопроизводительных кроссоверов устанавливает стандарт для повседневной 
            эпической спортивной езды. Модели EXEED и EXLANTIX предлагают захватывающие поездки на работу.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button 
              onClick={() => openModal('callback')} 
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Записаться на тест-драйв
            </button>
            <button 
              onClick={() => openModal('callback')} 
              className="w-full sm:w-auto bg-white hover:bg-black text-black hover:text-white border-2 border-black text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              Узнать больше
            </button>
          </div>
        </div>
      </section>

      {/* Credit Section */}
      <section id="credit" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-1 bg-orange-500"></div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-black">
                КРЕДИТ И РАССРОЧКА
              </h2>
              <div className="w-12 h-1 bg-orange-500"></div>
            </div>
          </div>
          
<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
  {/* Карточка Авторассрочка */}
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 flex flex-col">
    <div className="text-center mb-6">
      <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-2 text-black">Авторассрочка</h3>
      <p className="text-3xl font-bold text-orange-500 mb-2">от 20 000 ₽</p>
      <p className="text-gray-600">в месяц без переплат</p>
    </div>

    <ul className="space-y-2 mb-6 text-sm text-gray-700 flex-grow">
      <li className="flex items-center">
        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
        Без первоначального взноса
      </li>
      <li className="flex items-center">
        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
        Быстрое оформление
      </li>
      <li className="flex items-center">
        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
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
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 flex flex-col">
    <div className="text-center mb-6">
      <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-2 text-black">Банковский кредит</h3>
      <p className="text-3xl font-bold text-gray-800 mb-2">от 5,9%</p>
      <p className="text-gray-600">годовых</p>
    </div>

    <ul className="space-y-2 mb-6 text-sm text-gray-700 flex-grow">
      <li className="flex items-center">
        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
        Низкая процентная ставка
      </li>
      <li className="flex items-center">
        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
        Срок до 7 лет
      </li>
      <li className="flex items-center">
        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
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

      {/* Dealers Section */}
      <DealersMapSection dealers={dealers} />
    </div>
  );
};

export default HomePage;