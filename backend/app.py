from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_compress import Compress
from flask_caching import Cache
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="frontend/dist", static_url_path="/")

# --- 🔥 Сжатие и кеш ---
Compress(app)
cache = Cache(app, config={"CACHE_TYPE": "simple", "CACHE_DEFAULT_TIMEOUT": 300})

# --- CORS ---
CORS(
    app,
    resources={r"/api/*": {"origins": "*"}},
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
    supports_credentials=False,
    max_age=3600
)

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
    response.headers["Access-Control-Max-Age"] = "3600"
    response.headers["Cache-Control"] = "public, max-age=3600, immutable"
    return response

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = jsonify({"status": "ok"})
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"
        response.headers["Access-Control-Max-Age"] = "3600"
        return response

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key")

# --- API ---
@app.route("/api/health", methods=["GET"])
@cache.cached()
def health_check():
    return jsonify({"status": "ok", "message": "EXEED API is running"})

@app.route("/api/models", methods=["GET"])
@cache.cached()
def get_models():
    models = [
        {"id": 1, "name": "EXEED LX FL", "brand": "EXEED", "price": "от 2 175 000 ₽", "old_price": "2 790 000 ₽", "image": "/static/images/models/exeedlx.webp"},
        {"id": 2, "name": "EXEED TXL FL", "brand": "EXEED", "price": "от 2 950 000 ₽", "old_price": "3 600 000 ₽", "image": "/static/images/models/exeedtxl.webp"},
        {"id": 3, "name": "EXEED RX", "brand": "EXEED", "price": "от 3 650 000 ₽", "old_price": "4 550 000 ₽", "image": "/static/images/models/rx.webp"},
        {"id": 4, "name": "EXEED VX FL", "brand": "EXEED", "price": "от 4 565 000 ₽", "old_price": "6 040 000 ₽", "image": "/static/images/models/vx.webp"},
        {"id": 5, "name": "EXLANTIX ET", "brand": "EXLANTIX", "price": "от 6 300 000 ₽", "old_price": "6 600 000 ₽", "image": "/static/images/models/exlantix-et.webp"},
        {"id": 6, "name": "EXLANTIX ES", "brand": "EXLANTIX", "price": "от 5 690 000 ₽", "old_price": "5 990 000 ₽", "image": "/static/images/models/exlantix-es.webp"}
    ]
    return jsonify(models)

@app.route("/api/dealers", methods=["GET"])
@cache.cached()
def get_dealers():
    dealers = [
        {"id": 1, "name": "Дилер ПРАЙД", "address": "Ростов-на-Дону, ул. Малиновского, 43", "phone": "+7 (863) 320-33-55"},
        {"id": 2, "name": "Дилер СОКОЛ-МОТОРС", "address": "Ростов-на-Дону, ул. Пойменная, 1г", "phone": "+7 (863) 320-33-54"}
    ]
    return jsonify(dealers)


@app.route("/api/test-drive", methods=["POST"])
def submit_test_drive():
    data = request.get_json()
    if not all(data.get(f) for f in ["name", "phone", "model", "dealer"]):
        return jsonify({"error": "Все поля обязательны"}), 400
    return jsonify({"message": "Заявка успешно отправлена", "id": 1}), 201


@app.route("/api/credit", methods=["POST"])
def submit_credit():
    data = request.get_json()
    if not all(data.get(f) for f in ["name", "phone", "income", "dealer"]):
        return jsonify({"error": "Все поля обязательны"}), 400
    return jsonify({"message": "Заявка успешно отправлена", "id": 1}), 201


@app.route("/api/callback", methods=["POST"])
def submit_callback():
    data = request.get_json()
    if not all(data.get(f) for f in ["name", "phone", "dealer", "dataConsent", "communicationConsent"]):
        return jsonify({"error": "Все поля обязательны"}), 400
    return jsonify({"message": "Заявка успешно отправлена", "id": 1}), 201


# --- React маршруты ---
@app.route("/exeed-models")
@app.route("/exlantix-models")
@app.route("/credit")
@app.route("/trade-in")
@app.route("/dealers")
@app.route("/test-drive")
def react_routes():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path.startswith("api/"):
        return jsonify({"error": "Эндпоинт не найден"}), 404
    return send_from_directory(app.static_folder, "index.html")

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Эндпоинт не найден"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Внутренняя ошибка сервера"}), 500

if __name__ == "__main__":
    print("🚀 Starting EXEED API server with compression + cache + SPA fallback")
    app.run(debug=False, host="0.0.0.0", port=5002)
