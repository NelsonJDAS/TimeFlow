import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:25111985@localhost/plantilla')
    SQLALCHEMY_TRACK_MODIFICATIONS = False