from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# Настраиваем CORS для всех доменов в разработке
CORS(app, origins=['*'])

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
            'image': '/static/images/models/exeed-lx.jpg'
        },
        {
            'id': 2,
            'name': 'EXEED VX', 
            'brand': 'EXEED',
            'price': 'от 3 490 000 ₽',
            'image': '/static/images/models/exeed-vx.jpg'
        },
        {
            'id': 3,
            'name': 'EXLANTIX ES',
            'brand': 'EXLANTIX', 
            'price': 'от 4 290 000 ₽',
            'image': '/static/images/models/exlantix-es.jpg'
        }
    ]
    return jsonify(models)

@app.route('/api/dealers', methods=['GET'])
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

@app.route('/api/test-drive', methods=['POST'])
def submit_test_drive():
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

@app.route('/api/credit', methods=['POST'])
def submit_credit():
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

@app.route('/api/callback', methods=['POST'])
def submit_callback():
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
    app.run(debug=True, host='0.0.0.0', port=5002)