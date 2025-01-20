from flask import Blueprint, jsonify
from .models import ExampleModel

routes = Blueprint('routes', __name__)

@routes.route('/ms')
def home():
    return jsonify({'message': 'Welcome to the Flask API'})
    