#!/bin/bash

echo "🔄 Принудительный перезапуск всех сервисов..."

# Убиваем ВСЕ процессы
echo "🛑 Остановка всех процессов..."
pkill -f "python.*app.py" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true
pkill -f "node.*vite" 2>/dev/null || true
pkill -f "gunicorn" 2>/dev/null || true

sleep 3

# Очищаем порты
echo "🧹 Очистка портов..."
lsof -ti:5002 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

sleep 2

# Активируем виртуальное окружение
source venv/bin/activate

# Запускаем backend
echo "🚀 Запуск API на localhost:5002..."
cd backend
nohup python app.py > ../logs/api.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
cd ..

# Ждем запуска API
echo "⏳ Ожидание запуска API..."
sleep 5

# Проверяем API
echo "🔍 Проверка API..."
if curl -s http://localhost:5002/api/health > /dev/null; then
    echo "✅ API работает"
else
    echo "❌ API не отвечает, проверьте logs/api.log"
    exit 1
fi

# Очищаем кеш npm и node_modules если нужно
cd frontend
echo "🧹 Очистка кеша фронтенда..."
rm -rf node_modules/.vite 2>/dev/null || true
rm -rf dist 2>/dev/null || true

# Запускаем frontend ИЗ ПРАВИЛЬНОЙ ПАПКИ
echo "🚀 Запуск фронтенда на localhost:3001..."
nohup npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
cd ..

echo ""
echo "🎉 Сервисы запущены!"
echo "📱 Frontend: http://localhost:3001"
echo "🔧 API: http://localhost:5002"
echo ""
echo "📋 Логи:"
echo "  API: tail -f logs/api.log"
echo "  Frontend: tail -f logs/frontend.log"
echo ""
echo "🌐 Откройте http://localhost:3001 в браузере"
echo "🔄 Принудительно обновите страницу (Ctrl+Shift+R)"
echo ""
echo "📄 Проверьте шрифты:"
echo "  http://localhost:3001/fonts/TacticSans/TacticSansExtExd-Bld.woff2"

# Сохраняем PID для остановки
echo "$BACKEND_PID $FRONTEND_PID" > .running_pids