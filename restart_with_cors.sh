#!/bin/bash

echo "Перезапуск EXEED проекта с исправлением CORS..."

# Останавливаем все процессы
echo "Остановка процессов..."
./stop_all.sh 2>/dev/null || true
pkill -f "python.*app.py" || true
pkill -f "npm.*dev" || true

# Ждем немного
sleep 2

# Активируем виртуальное окружение
source venv/bin/activate

# Запускаем backend на localhost (важно!)
echo "Запуск API на localhost:5002..."
cd backend
python app.py &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
cd ..

# Ждем запуска API
sleep 3

# Проверяем что API работает локально
echo "Проверка API..."
curl -s http://localhost:5002/api/health && echo " ✅ API работает" || echo " ❌ API не отвечает"

# Запускаем frontend с прокси
echo "Запуск фронтенда с прокси..."
cd frontend
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
cd ..

echo ""
echo "=== Сервисы запущены ==="
echo "Backend: http://localhost:5002 (PID: $BACKEND_PID)"
echo "Frontend: http://localhost:3001 (PID: $FRONTEND_PID)"
echo ""
echo "🔥 Откройте http://localhost:3001 в браузере"
echo "📝 Прокси перенаправит /api/* на localhost:5002"
echo "Нажмите Ctrl+C для остановки"

# Функция для остановки процессов
cleanup() {
    echo ""
    echo "Остановка сервисов..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Ждем сигнала остановки
wait