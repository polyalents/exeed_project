// Инициализация анимации кнопок
export const initButtonAnimations = () => {
  document.querySelectorAll('.js-button').forEach(btn => {
    // Убираем старые обработчики если есть
    btn.removeEventListener('mouseenter', handleMouseEnter);
    btn.removeEventListener('mouseleave', handleMouseLeave);
    
    // Добавляем новые обработчики
    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleMouseLeave);
  });
};

const handleMouseEnter = (e) => {
  // Дополнительные эффекты при наведении можно добавить здесь
  e.target.style.transform = 'scale(1.02)';
};

const handleMouseLeave = (e) => {
  // Возвращаем исходное состояние
  e.target.style.transform = 'scale(1)';
};

// Автоматическая инициализация при загрузке DOM
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initButtonAnimations);
}