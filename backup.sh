#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/root/backups/exeed_$DATE"

mkdir -p $BACKUP_DIR

# Бэкап базы данных
pg_dump -h localhost -U exeed_admin -d exeed_db > $BACKUP_DIR/database.sql

# Бэкап файлов проекта
tar -czf $BACKUP_DIR/project_files.tar.gz ~/exeed_project --exclude=node_modules --exclude=venv

echo "Backup created: $BACKUP_DIR"
