from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    db.init_app(app)
    migrate.init_app(app, db)  # Inicializa Flask-Migrate
    CORS(app)

    # Registrar el blueprint
    from .routes import routes
    app.register_blueprint(routes)

    # Inicializar Flask-Admin
    from .models import ExampleModel, User  # Importa tus modelos aquí
    admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
    admin.add_view(ModelView(ExampleModel, db.session))
    admin.add_view(ModelView(User, db.session))

    return app
