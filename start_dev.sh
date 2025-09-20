#!/bin/bash
echo "Starting EXEED development environment..."

# Активируем виртуальное окружение
source venv/bin/activate

# Запускаем backend в фоне
cd backend
python app.py &
BACKEND_PID=$!

# Запускаем админку в фоне
cd ../admin
python admin_app.py &
ADMIN_PID=$!

# Запускаем frontend
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Admin PID: $ADMIN_PID" 
echo "Frontend PID: $FRONTEND_PID"

echo "Development environment started!"
echo "Frontend: http://localhost:3001"
echo "Backend API: http://localhost:5000"
echo "Admin: http://localhost:5001"

# Ждем сигнала для остановки
wait
