from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Конфигурация
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'EXEED API is running'})

@app.route('/api/models', methods=['GET'])
def get_models():
    # Временные данные для тестирования
    models = [
        {
            'id': 1, 
            'name': 'EXEED LX',
            'brand': 'EXEED',
            'price': 'от 2 990 000 ₽',
            'image': '/static/images/exeed-lx.jpg'
        },
        {
            'id': 2,
            'name': 'EXEED VX', 
            'brand': 'EXEED',
            'price': 'от 3 490 000 ₽',
            'image': '/static/images/exeed-vx.jpg'
        },
        {
            'id': 3,
            'name': 'EXLANTIX ES',
            'brand': 'EXLANTIX', 
            'price': 'от 4 290 000 ₽',
            'image': '/static/images/exlantix-es.jpg'
        }
    ]
    return jsonify(models)

@app.route('/api/dealers', methods=['GET'])
def get_dealers():
    dealers = [
        {
            'id': 1,
            'name': 'Дилер Малиновского',
            'address': 'ул. Малиновского, 123',
            'phone': '+7 (863) 123-45-67'
        },
        {
            'id': 2,
            'name': 'Дилер Пойменная',
            'address': 'ул. Пойменная, 456', 
            'phone': '+7 (863) 234-56-78'
        }
    ]
    return jsonify(dealers)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
