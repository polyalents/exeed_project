from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# 🔥 Настройка CORS
CORS(
    app,
    resources={r"/api/*": {"origins": "*"}},
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
    supports_credentials=False,
    max_age=3600
)

# Добавляем заголовки ко всем ответам
@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
    response.headers["Access-Control-Max-Age"] = "3600"
    return response

# Обработка preflight (OPTIONS)
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = jsonify({"status": "ok"})
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
        response.headers["Access-Control-Max-Age"] = "3600"
        return response

# Конфиг
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key")

# --- Эндпоинты ---
@app.route("/api/health", methods=["GET", "OPTIONS"])
def health_check():
    return jsonify({"status": "ok", "message": "EXEED API is running"})

@app.route("/api/models", methods=["GET"])
def get_models():
    models = [
        {"id": 1, "name": "EXEED LX", "brand": "EXEED", "price": "от 2 690 000 ₽", "image": "/static/images/models/exeedlx.webp"},
        {"id": 2, "name": "EXEED TXL", "brand": "EXEED", "price": "от 3 250 000 ₽", "image": "/static/images/models/exeedtxl.webp"},
        {"id": 3, "name": "EXEED RX", "brand": "EXEED", "price": "от 3 990 000 ₽", "image": "/static/images/models/rx.webp"},
        {"id": 4, "name": "EXEED VX", "brand": "EXEED", "price": "от 4 490 000 ₽", "image": "/static/images/models/vx.webp"},
        {"id": 5, "name": "EXLANTIX ET", "brand": "EXLANTIX", "price": "от 6 600 000 ₽", "image": "/static/images/models/exlantix-et.webp"},
        {"id": 6, "name": "EXLANTIX ES", "brand": "EXLANTIX", "price": "от 5 990 000 ₽", "image": "/static/images/models/exlantix-es.webp"}
    ]
    return jsonify(models)

@app.route("/api/dealers", methods=["GET"])
def get_dealers():
    dealers = [
        {"id": 1, "name": "Дилер ПРАЙД", "address": "Ростов-на-Дону, ул. Малиновского, 43", "phone": "+7 (863) 320-33-55"},
        {"id": 2, "name": "Дилер СОКОЛ-МОТОРС", "address": "Ростов-на-Дону, ул. Пойменная, 1г", "phone": "+7 (863) 320-33-54"}
    ]
    return jsonify(dealers)

@app.route("/api/test-drive", methods=["POST"])
def submit_test_drive():
    try:
        data = request.get_json()
        required = ["name", "phone", "model", "dealer"]
        for f in required:
            if not data.get(f):
                return jsonify({"error": f"Поле {f} обязательно"}), 400

        print("Заявка на тест-драйв:", data)
        return jsonify({"message": "Заявка успешно отправлена", "id": 1}), 201
    except Exception as e:
        print("Ошибка:", e)
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

@app.route("/api/credit", methods=["POST"])
def submit_credit():
    try:
        data = request.get_json()
        required = ["name", "phone", "income", "dealer"]
        for f in required:
            if not data.get(f):
                return jsonify({"error": f"Поле {f} обязательно"}), 400

        print("Заявка на кредит:", data)
        return jsonify({"message": "Заявка успешно отправлена", "id": 1}), 201
    except Exception as e:
        print("Ошибка:", e)
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

@app.route("/api/callback", methods=["POST"])
def submit_callback():
    try:
        data = request.get_json()
        required = ["name", "phone", "dealer"]
        for f in required:
            if not data.get(f):
                return jsonify({"error": f"Поле {f} обязательно"}), 400

        if not data.get("dataConsent"):
            return jsonify({"error": "Необходимо согласие на обработку данных"}), 400
        if not data.get("communicationConsent"):
            return jsonify({"error": "Необходимо согласие на коммуникацию"}), 400

        print("Заявка на звонок:", data)
        return jsonify({"message": "Заявка успешно отправлена", "id": 1}), 201
    except Exception as e:
        print("Ошибка:", e)
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

# --- Ошибки ---
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Эндпоинт не найден"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Внутренняя ошибка сервера"}), 500

if __name__ == "__main__":
    print("🚀 Starting EXEED API server with CORS enabled")
    app.run(debug=True, host="0.0.0.0", port=5002)
