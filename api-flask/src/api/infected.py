from flask import jsonify, request
from . import api
from ..models.infectedModel import Infected
from ..schemas import InfectedSchema
from ..models.database import db

infected_schema = InfectedSchema()
minfected_schema = InfectedSchema(many = True)

# CREATE A NEW INFECTED
@api.route('/api/infected', methods=['POST'])
def create_infected():
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    age = request.json['age']
    infect_date = request.json['infect_date']
    gender_id = request.json['gender_id']
    country_id = request.json['country_id']
    status_id = request.json['status_id']
    
    new_infected = Infected(first_name, last_name, age, infect_date, gender_id, country_id, status_id)
    
    try:
        db.session.add(new_infected)
        db.session.commit()

        return infected_schema.jsonify(new_infected)

    except AssertionError as exeption_message:
        return jsonify(msg = 'Error: {}.'.format(exeption_message)), 400

# GET ALL INFECTED
@api.route('/api/infected', methods=['GET'])
def get_all_infected():
    all_infected = Infected.query.all()
    result = minfected_schema.dump(all_infected)
    return jsonify(result)

# GET A SINGLE INFECTED BY ID
@api.route('/api/infected/<id>', methods=['GET'])
def get_infected(id):
    infected = Infected.query.get(id)
    return infected_schema.jsonify(infected)

# UPDATE A INFECTED
@api.route('/api/infected/<id>', methods=['PUT'])
def update_infected(id):
    infected = Infected.query.get(id)

    first_name = request.json['first_name']
    last_name = request.json['last_name']
    age = request.json['age']
    infect_date = request.json['infect_date']
    gender_id = request.json['gender_id']
    country_id = request.json['country_id']
    status_id = request.json['status_id']

    infected.first_name = first_name
    infected.last_name = last_name
    infected.age = age
    infected.infect_date = infect_date
    infected.gender_id = gender_id
    infected.country_id = country_id
    infected.status_id = status_id

    try:
        db.session.commit()

        return infected_schema.jsonify(infected)

    except AssertionError as exeption_message:
        return jsonify(msg = 'Error: {}.'.format(exeption_message)), 400

# DELETE A INFECTED
@api.route('/api/infected/<id>', methods=['DELETE'])
def delete_infected(id):
    infected = Infected.query.get(id)

    db.session.delete(infected)
    db.session.commit()

    return infected_schema.jsonify(infected)
