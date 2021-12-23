# -*- coding: utf-8 -*-


from flask import Flask, request
from flask_cors import CORS
#from sqlhelper import *
import API_Utilis as api
import json
import os

app = Flask(__name__)
CORS(app)

"""app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'adler'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)"""

@app.route("/", methods = ["GET", "POST"])
def home():
    return "It is working"
#################################################################################################

@app.route("/verify", methods = ["GET", "POST"])
def verify():
    img64 = request.get_json()['img64']
    result = api.identify(img64)
    return json.dumps({"Prediction": result})


################################################################################################

@app.route("/register", methods = ["GET", "POST"])
def register():
    name = request.get_json()['name']
    m_id = request.get_json()['m_id']
    department = request.get_json()['department']
    m_type = request.get_json()['m_type']
    m_vaccination = request.get_json()['m_vaccination']
    img64 = request.get_json()['img64']
    result = api.add_member(name, m_id, department, m_type, m_vaccination, img64)
    return json.dumps({"result": result})

############################
@app.route("/test", methods = ["GET", "POST"])
def test():
    img64 = request.get_json()['img64']
    new = api.decode_test_image(img64)
    result = "HELLO there"
    return json.dumps({"message": result, "result": new})

if __name__=='__main__':
    app.secret_key = 'secret123'
    app.run(debug = True)