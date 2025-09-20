#!/bin/bash
echo "Starting EXEED production environment..."

# Билдим фронтенд
cd frontend
npm run build

# Запускаем сервисы
sudo systemctl start exeed-api
sudo systemctl start exeed-admin
sudo systemctl reload nginx

echo "Production environment started!"
