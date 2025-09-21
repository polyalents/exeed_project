// Инициализация анимации кнопок
export const initButtonAnimations = () => {
  document.querySelectorAll('.js-button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.classList.add('animate');
    });
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('animate');
    });
  });
};

// Автоматическая инициализация при загрузке DOM
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initButtonAnimations);
}