#!/bin/bash

cleanup() {
    echo "Останавливаем все сервисы..."
    kill $BACKEND_PID $ADMIN_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

echo "Запускаем все сервисы EXEED..."
source venv/bin/activate

# Запускаем backend с выводом ошибок
echo "Запускаем API..."
cd backend
python app.py > ../logs/api.log 2>&1 &
BACKEND_PID=$!
echo "API PID: $BACKEND_PID"
cd ..

# Пауза между запусками
sleep 2

# Запускаем админку
echo "Запускаем админку..."
cd admin  
python admin_app.py > ../logs/admin.log 2>&1 &
ADMIN_PID=$!
echo "Admin PID: $ADMIN_PID"
cd ..

sleep 2

# Запускаем frontend
echo "Запускаем фронтенд..."
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
cd ..

echo ""
echo "Проверяем процессы через 3 секунды..."
sleep 3

# Проверяем что процессы живы
if kill -0 $BACKEND_PID 2>/dev/null; then
    echo "✓ API работает"
else
    echo "✗ API упал, проверь logs/api.log"
fi

if kill -0 $ADMIN_PID 2>/dev/null; then
    echo "✓ Админка работает"  
else
    echo "✗ Админка упала, проверь logs/admin.log"
fi

if kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "✓ Фронтенд работает"
else
    echo "✗ Фронтенд упал, проверь logs/frontend.log"
fi

echo ""
echo "Нажми Ctrl+C для остановки"
wait