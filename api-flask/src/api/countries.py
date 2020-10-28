from flask import jsonify, request
from . import api
from ..models.countriesModel import Countries
from ..schemas import CountrySchema
from ..models.database import db

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

# CREATE COUNTRY
@api.route('/api/countries', methods=['POST'])
def create_country():
    name = request.json['name']
    infected = request.json['infected']

    new_country = Countries(name, infected)
    db.session.add(new_country)
    db.session.commit()

    return country_schema.jsonify(new_country)

# GET ALL COUNTRIES
@api.route('/api/countries', methods=['GET'])
def get_countries():
    all_countries = Countries.query.all()
    result = countries_schema.dump(all_countries)

    return jsonify(result)

# GET A COUNTRY
@api.route('/api/countries/<id>', methods=['GET'])
def get_country(id):
    country = Countries.query.get(id)
    
    return country_schema.jsonify(country)

# UPDATE COUNTRY
@api.route('/api/countries/<id>', methods=['PUT'])
def update_country(id):
    country = Countries.query.get(id)

    name = request.json['name']
    infected = request.json['infected']

    country.name = name
    country.infected = infected

    db.session.commit()

    return country_schema.jsonify(country)

# DELETE COUNTRY
@api.route('/api/countries/<id>', methods=['DELETE'])
def delete_country():
    country = Countries.query.get(id)

    db,session.delete(country)
    db.session.commit()

    return country_schema.jsonify(country)
