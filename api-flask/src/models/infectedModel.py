from .database import db
from sqlalchemy.orm import validates

class Infected(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(45))
    last_name = db.Column(db.String(45))
    age = db.Column(db.Integer)
    infect_date = db.Column(db.DateTime)
    gender_id = db.Column(db.Integer)
    country_id = db.Column(db.Integer)
    status_id = db.Column(db.Integer)

    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if not first_name:
            raise AssertionError('No first name provided')

        return first_name

    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if not last_name:
            raise AssertionError('No last name provided')
        
        return last_name

    def __init__(self, first_name, last_name, age, infect_date, gender_id, country_id, status_id):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.infect_date = infect_date
        self.gender_id = gender_id
        self.country_id = country_id
        self.status_id = status_id
 
    
