from .database import db

class Countries(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45))
    infected = db.Column(db.Integer)

    def __init__(self, name, infected):
        self.name = name
        self.infected = infected

