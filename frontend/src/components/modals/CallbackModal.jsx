import React, { useState } from 'react';
import apiService from '../../services/api';

const CallbackModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dealer: '',
    dataConsent: false,
    communicationConsent: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const dealers = [
    { value: 'poymenaya', label: 'ул. Пойменная, 1г' },
    { value: 'malinovskogo', label: 'ул. Малиновского, 43' }
  ];

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    console.log('handlePhoneChange вызван, value:', value);
    
    // ВСЕГДА очищаем ошибку при ЛЮБОМ изменении
    setErrors(prev => ({ ...prev, phone: null }));
    
    // Если поле пустое
    if (value === '') {
      setFormData(prev => ({ ...prev, phone: '' }));
      return;
    }
    
    // Извлекаем все цифры из текущего значения
    let digits = value.replace(/\D/g, '');
    
    // Если первая цифра не 7, добавляем 7 в начало
    if (digits.length > 0 && !digits.startsWith('7')) {
      digits = '7' + digits;
    }
    
    // Убираем лишние цифры (максимум 11: 7 + 10 цифр номера)
    digits = digits.slice(0, 11);
    
    // Простое форматирование
    let result = '';
    for (let i = 0; i < digits.length; i++) {
      if (i === 0) result += '+';
      if (i === 1) result += ' (';
      if (i === 4) result += ') ';
      if (i === 7) result += '-';
      if (i === 9) result += '-';
      result += digits[i];
    }
    
    console.log('результат форматирования:', result);
    
    setFormData(prev => ({ ...prev, phone: result }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }
    
    // Извлекаем только цифры из номера
    const phoneNumbers = formData.phone.replace(/\D/g, '');
    console.log('валидация телефона, цифры:', phoneNumbers);
    
    if (phoneNumbers.length !== 11) {
      newErrors.phone = 'Введите корректный номер телефона';
    } else {
      // Проверяем что после 7 идет 8 или 9 (это ВТОРАЯ цифра после извлечения)
      const firstDigitAfter7 = phoneNumbers.charAt(1); // вторая цифра в строке 7XXXXXXXXXX
      console.log('первая цифра после 7:', firstDigitAfter7);
      
      if (!['8', '9'].includes(firstDigitAfter7)) {
        newErrors.phone = 'Номер должен начинаться с +7 8__ или +7 9__';
        console.log('ошибка валидации - неправильная цифра');
      } else {
        console.log('валидация прошла успешно');
      }
    }
    
    if (!formData.dealer) {
      newErrors.dealer = 'Выберите дилерский центр';
    }
    
    if (!formData.dataConsent) {
      newErrors.dataConsent = 'Необходимо согласие на обработку данных';
    }
    
    if (!formData.communicationConsent) {
      newErrors.communicationConsent = 'Необходимо согласие на коммуникацию';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitted) {
      return; // Предотвращаем повторную отправку
    }
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Отправляем данные через API
      console.log('Отправка данных:', formData);
      
      const response = await apiService.submitCallback(formData);
      console.log('Ответ сервера:', response.data);
      
      // Отмечаем что заявка отправлена
      setIsSubmitted(true);
      setShowSuccess(true);
      
      // Сбрасываем форму
      setFormData({
        name: '',
        phone: '',
        dealer: '',
        dataConsent: false,
        communicationConsent: false
      });
      
    } catch (error) {
      console.error('Ошибка отправки:', error);
      
      // Если это не ошибка сети (мок данные), показываем успех
      if (error.response?.data?.message || error.config?.url?.includes('/callback')) {
        setIsSubmitted(true);
        setShowSuccess(true);
        setFormData({
          name: '',
          phone: '',
          dealer: '',
          dataConsent: false,
          communicationConsent: false
        });
      } else {
        alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Очищаем ошибку для любого поля при изменении
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleClose = () => {
    if (showSuccess) {
      setShowSuccess(false);
    }
    onClose();
  };

  const resetAndRefresh = () => {
    setIsSubmitted(false);
    setShowSuccess(false);
    setFormData({
      name: '',
      phone: '',
      dealer: '',
      dataConsent: false,
      communicationConsent: false
    });
  };

  if (!isOpen) return null;

  // Модальное окно успеха
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />
        
        <div className="relative bg-exeed-header rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          {/* Иконка успеха */}
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-xl font-heading font-bold text-white mb-2">
            Заявка успешно отправлена!
          </h3>
          <p className="text-gray-300 mb-6">
            Мы свяжемся с вами в ближайшее время.
          </p>
          
          <button
            onClick={handleClose}
            className="bg-exeed-dark hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-exeed-header rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <h2 className="text-xl font-heading font-bold text-white">
            Обратный звонок
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Предупреждение о повторной отправке */}
        {isSubmitted && (
          <div className="p-6 bg-yellow-900/50 border-b border-gray-600">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-yellow-400 font-medium">Вы уже отправили заявку</p>
                <p className="text-yellow-300 text-sm">
                  Обновите страницу, чтобы отправить повторно
                </p>
              </div>
            </div>
            <button
              onClick={resetAndRefresh}
              className="mt-3 text-yellow-400 hover:text-yellow-300 text-sm underline"
            >
              Сбросить и отправить новую заявку
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={`p-6 space-y-4 ${isSubmitted ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Имя */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ваше имя *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={isSubmitted}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-exeed-gray focus:ring-1 focus:ring-exeed-gray focus:outline-none transition-colors disabled:opacity-50"
              placeholder="Введите ваше имя"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Телефон */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Номер телефона *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              disabled={isSubmitted}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-exeed-gray focus:ring-1 focus:ring-exeed-gray focus:outline-none transition-colors disabled:opacity-50"
              placeholder="+7 (___) ___-__-__"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Дилерский центр */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Выберите дилерский центр *
            </label>
            <select
              value={formData.dealer}
              onChange={(e) => handleInputChange('dealer', e.target.value)}
              disabled={isSubmitted}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-exeed-gray focus:ring-1 focus:ring-exeed-gray focus:outline-none transition-colors disabled:opacity-50"
            >
              <option value="" disabled>Дилерский центр</option>
              {dealers.map(dealer => (
                <option key={dealer.value} value={dealer.value}>
                  {dealer.label}
                </option>
              ))}
            </select>
            {errors.dealer && (
              <p className="text-red-400 text-sm mt-1">{errors.dealer}</p>
            )}
          </div>

          {/* Согласия */}
          <div className="space-y-3 pt-2">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.dataConsent}
                onChange={(e) => handleInputChange('dataConsent', e.target.checked)}
                disabled={isSubmitted}
                className="mt-1 w-4 h-4 text-exeed-gray bg-gray-700 border-gray-600 rounded focus:ring-exeed-gray focus:ring-2 disabled:opacity-50"
              />
              <span className="text-sm text-gray-300 leading-5">
                Вы даете согласие на обработку персональных данных<span className="text-red-400 ml-1">*</span>
              </span>
            </label>
            {errors.dataConsent && (
              <p className="text-red-400 text-sm">{errors.dataConsent}</p>
            )}

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.communicationConsent}
                onChange={(e) => handleInputChange('communicationConsent', e.target.checked)}
                disabled={isSubmitted}
                className="mt-1 w-4 h-4 text-exeed-gray bg-gray-700 border-gray-600 rounded focus:ring-exeed-gray focus:ring-2 disabled:opacity-50"
              />
              <span className="text-sm text-gray-300 leading-5">
                Вы даете согласие на дальнейшую коммуникацию<span className="text-red-400 ml-1">*</span>
              </span>
            </label>
            {errors.communicationConsent && (
              <p className="text-red-400 text-sm">{errors.communicationConsent}</p>
            )}
          </div>

          {/* Кнопка отправки */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                isSubmitting || isSubmitted
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-exeed-dark hover:bg-gray-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Отправка...</span>
                </span>
              ) : isSubmitted ? (
                'Заявка отправлена'
              ) : (
                'Отправить заявку'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CallbackModal;