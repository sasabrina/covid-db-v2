import os
from flask import Flask, json
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
from src.api import api
from dotenv import load_dotenv
from src.models.database import db, bcrypt

load_dotenv()

db_user = os.getenv('DB_USER')
db_pass = os.getenv('DB_PASS')
db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')
cloud_sql_connection_name = os.getenv('CLOUD_SQL_CONNECTION_NAME')

if cloud_sql_connection_name:
    database_url = 'mysql+pymysql://' + db_user + ':' + db_pass + '@/' + db_name + cloud_sql_connection_name
else:
    database_url = 'mysql+pymysql://' + db_user + ':' + db_pass + '@' + db_host + '/' + db_name

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']=database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
bcrypt.init_app(app)
db.init_app(app)
app.register_blueprint(api)
CORS(app)

with app.app_context():
    db.create_all()

@app.errorhandler(HTTPException)
def handle_exception(e):
    response = e.get_response()
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

if __name__ == "__main__":
    app.run(debug = True)
