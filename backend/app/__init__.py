from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    db.init_app(app)
    CORS(app)

    # Registrar el blueprint
    from .routes import routes
    app.register_blueprint(routes)

    # Inicializar Flask-Admin
    from .models import ExampleModel  # Importa tus modelos aquí
    admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
    admin.add_view(ModelView(ExampleModel, db.session))

    with app.app_context():
        db.create_all()

    return app
