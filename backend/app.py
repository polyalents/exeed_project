from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Максимально открытая настройка CORS для решения проблемы
CORS(app, 
     origins=['*'],
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allow_headers=['*'],
     supports_credentials=False,
     max_age=3600)

# Добавляем CORS заголовки ко всем ответам
@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
    response.headers['Access-Control-Max-Age'] = '3600'
    return response

# Обработчик всех OPTIONS запросов (preflight)
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = jsonify({'status': 'ok'})
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
        response.headers['Access-Control-Max-Age'] = '3600'
        return response

# Конфигурация
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

@app.route('/api/health', methods=['GET', 'OPTIONS'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'EXEED API is running'})

@app.route('/api/models', methods=['GET', 'OPTIONS'])
def get_models():
    # Полный модельный ряд
    models = [
        {
            'id': 1, 
            'name': 'EXEED LX',
            'brand': 'EXEED',
            'price': 'от 2 690 000 ₽',
            'image': '/static/images/exeedlx.jpg'
        },
        {
            'id': 2,
            'name': 'EXEED TXL', 
            'brand': 'EXEED',
            'price': 'от 3 250 000 ₽',
            'image': '/static/images/exeedtxl.jpg'
        },
        {
            'id': 3,
            'name': 'EXEED RX',
            'brand': 'EXEED',
            'price': 'от 3 990 000 ₽',
            'image': '/static/images/rx.jpg'
        },
        {
            'id': 4,
            'name': 'EXEED VX', 
            'brand': 'EXEED',
            'price': 'от 4 490 000 ₽',
            'image': '/static/images/vx.jpg'
        },
        {
            'id': 5,
            'name': 'EXLANTIX ET',
            'brand': 'EXLANTIX', 
            'price': 'от 6 600 000 ₽',
            'image': '/static/images/exlantix-et.jpg'
        },
        {
            'id': 6,
            'name': 'EXLANTIX ES',
            'brand': 'EXLANTIX', 
            'price': 'от 5 990 000 ₽',
            'image': '/static/images/exlantix-es.jpg'
        }
    ]
    return jsonify(models)

@app.route('/api/dealers', methods=['GET', 'OPTIONS'])
def get_dealers():
    dealers = [
        {
            'id': 1,
            'name': 'Дилер Пойменная',
            'address': 'Ростов-на-Дону, ул. Пойменная, 1г',
            'phone': '+7 (863) 320-33-54'
        },
        {
            'id': 2,
            'name': 'Дилер Малиновского',
            'address': 'Ростов-на-Дону, ул. Малиновского, 43', 
            'phone': '+7 (863) 320-33-55'
        }
    ]
    return jsonify(dealers)

@app.route('/api/test-drive', methods=['POST', 'OPTIONS'])
def submit_test_drive():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'})
        
    try:
        data = request.get_json()
        
        # Валидация данных
        required_fields = ['name', 'phone', 'model', 'dealer']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Поле {field} обязательно'}), 400
        
        # Здесь будет логика сохранения заявки в БД
        print(f"Заявка на тест-драйв: {data}")
        
        return jsonify({
            'message': 'Заявка на тест-драйв успешно отправлена',
            'id': 1
        }), 201
        
    except Exception as e:
        return jsonify({'error': 'Внутренняя ошибка сервера'}), 500

@app.route('/api/credit', methods=['POST', 'OPTIONS'])
def submit_credit():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'})
        
    try:
        data = request.get_json()
        
        # Валидация данных
        required_fields = ['name', 'phone', 'income', 'dealer']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Поле {field} обязательно'}), 400
        
        # Здесь будет логика сохранения заявки в БД
        print(f"Заявка на кредит: {data}")
        
        return jsonify({
            'message': 'Заявка на кредит успешно отправлена',
            'id': 1
        }), 201
        
    except Exception as e:
        return jsonify({'error': 'Внутренняя ошибка сервера'}), 500

@app.route('/api/callback', methods=['POST', 'OPTIONS'])
def submit_callback():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'})
        
    try:
        data = request.get_json()
        
        # Валидация данных
        required_fields = ['name', 'phone', 'dealer']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Поле {field} обязательно'}), 400
        
        # Проверяем согласия
        if not data.get('dataConsent'):
            return jsonify({'error': 'Необходимо согласие на обработку данных'}), 400
            
        if not data.get('communicationConsent'):
            return jsonify({'error': 'Необходимо согласие на коммуникацию'}), 400
        
        # Здесь будет логика сохранения заявки в БД
        print(f"Заявка на обратный звонок: {data}")
        
        return jsonify({
            'message': 'Заявка на обратный звонок успешно отправлена',
            'id': 1
        }), 201
        
    except Exception as e:
        print(f"Ошибка при обработке заявки: {e}")
        return jsonify({'error': 'Внутренняя ошибка сервера'}), 500

# Обработчик ошибок 404
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Эндпоинт не найден'}), 404

# Обработчик ошибок 500
@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Внутренняя ошибка сервера'}), 500

if __name__ == '__main__':
    print("Starting EXEED API server...")
    print("CORS enabled for all origins")
    app.run(debug=True, host='0.0.0.0', port=5002)