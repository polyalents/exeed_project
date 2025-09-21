#!/bin/bash
cd /root/exeed_project
source venv/bin/activate

# Запускаем API через gunicorn
cd backend
gunicorn --daemon --workers 3 --bind 127.0.0.1:5002 --pid /tmp/exeed-api.pid app:app
cd ..

# Запускаем админку через gunicorn  
cd admin
gunicorn --daemon --workers 2 --bind 127.0.0.1:5001 --pid /tmp/exeed-admin.pid admin_app:app
cd ..

# Билдим и подготавливаем фронтенд для nginx
cd frontend
npm run build
cd ..

# СНАЧАЛА копируем собранный фронтенд
sudo cp -r frontend/dist/* /var/www/exeed/

# ПОТОМ копируем статические файлы (чтобы не перезаписались)
sudo cp -r static /var/www/exeed/

# Копируем шрифты
sudo mkdir -p /var/www/exeed/fonts
sudo cp -r frontend/public/fonts/* /var/www/exeed/fonts/

# Копируем другие статические файлы если есть
if [ -d "frontend/public/static" ]; then
    sudo mkdir -p /var/www/exeed/static
    sudo cp -r frontend/public/static/* /var/www/exeed/static/
fi

# Устанавливаем правильные права доступа
sudo chown -R www-data:www-data /var/www/exeed/
sudo find /var/www/exeed/ -type d -exec chmod 755 {} \;
sudo find /var/www/exeed/ -type f -exec chmod 644 {} \;

echo "All EXEED services started in daemon mode"
echo "Fonts and static files copied to production"