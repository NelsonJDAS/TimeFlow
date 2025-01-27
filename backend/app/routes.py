from flask import Blueprint, jsonify , request
from .models import ExampleModel, User
from . import db

routes = Blueprint('routes', __name__)

@routes.route('/ms')
def home():
    return jsonify({'message': 'Welcome to the Flask API'})
    
@routes.route('/user', methods=['POST'])
def create_user():
    # crear un usuario desde el body de esta peticion  #
    request_data = request.get_json()
    user = User(name= request_data['name'], email= request_data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'})
