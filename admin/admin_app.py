from flask import Flask, render_template_string
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/admin')
def admin_dashboard():
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>EXEED Админка</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { background: #003d82; color: white; padding: 20px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>EXEED & EXLANTIX Админка</h1>
        </div>
        <h2>Управление контентом</h2>
        <p>Админка в разработке...</p>
    </body>
    </html>
    """
    return render_template_string(html)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
