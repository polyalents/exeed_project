#!/bin/bash
# Останавливаем gunicorn процессы
if [ -f /tmp/exeed-api.pid ]; then
    kill $(cat /tmp/exeed-api.pid)
    rm /tmp/exeed-api.pid
fi

if [ -f /tmp/exeed-admin.pid ]; then
    kill $(cat /tmp/exeed-admin.pid)  
    rm /tmp/exeed-admin.pid
fi

echo "All EXEED services stopped"
