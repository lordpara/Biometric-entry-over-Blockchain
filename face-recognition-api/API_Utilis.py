# -*- coding: utf-8 -*-
"""
Created on Thu Dec  9 16:44:52 2021

@author: Brindrajsinh Chauhan
"""

import face_recognition as fr
path = "./Images/Known"
import random
from datetime import datetime
from time import time
import base64
test_path = './Images/Test/test_image.jpg'


def process_known(info):
    known_encoding = {}
    data = info.split(",")
    if data[0] != "Name":
        name, m_id, department, m_type, m_vaccine = data
            
        image_path = path+"/"+m_id+".jpg"
        image = fr.load_image_file(image_path)
        try:
            face_encoding = fr.face_encodings(image)[0]
            known_encoding["Message"] = "Success"
            known_encoding["ID"] = m_id
            known_encoding["Name"] = name
            known_encoding["Department"] = department
            known_encoding["Status"] = m_type
            known_encoding["Vaccine"] = m_vaccine
            known_encoding["encoding"] = face_encoding
        except:
            known_encoding["Message"] = "Error"
    else:
        known_encoding["Message"] = "Ignore"  
        
    return known_encoding

    
def identify(img64):

    img_decode = decode_test_image(img64)
    test_encoding = encode_image_path(test_path)
    if test_encoding[0] != "Error":
        prediction = {"Message":"No Match Found"}
        members = open("./Database/Members.csv", "r+")
        for info in members:
            known = process_known(info)
            if known["Message"] == "Success":
                _encode = known["encoding"]
                result = fr.compare_faces([_encode], test_encoding[1], tolerance=0.65)
                if result[0]:
                    prediction = {"Message": "Match Found","Name":known["Name"], "ID": known["ID"],"Department": known["Department"],"Type": known["Status"],"Vaccination_Status": known["Vaccine"]} 
                    break
        return prediction
    else:
        return {"Message":"Error"}
        
    
    
def encode_image_path(image_path):
    try:
        image = fr.load_image_file(image_path)
    except Exception as e2:
        print("E2 Here")
        print("This is the image exception", e2)
    try:
        image_encoding = fr.face_encodings(image)[0]
        output = image_encoding
        message = "Success"
    
    except Exception as e:
        message = "Error"
        output = ""
        print(e)
        
    return [message, output]
    
def add_member(name, m_id, department, m_type, m_vaccination, img64):
    try:
        img64 = process_img64(img64)["output"]
        fi = open(f'./Images/Known/{m_id}.jpg', "wb")
        fi.write(base64.b64decode((img64)))
        fi.close()
        
        members = open("./Database/Members.csv", "a+")
        members.write(f"{name},{m_id},{department},{m_type},{m_vaccination}")
        message = "Member Added"
    except:
        message = "Error while Adding"
        
    return {"Message":message}
    
def decode_test_image(img64):
    try:
        print("in the decode image section")
        img64 = process_img64(img64)["output"]
        test = open('./Images/Test/test_image.jpg', "wb")
        test.write(base64.b64decode((img64)))
        test.close()
        message = "Success"
    except:
        message = "Error while decoding Test image"
        
    return {"Message":message}
    
def process_img64(img64):
    try:
        result = img64[22:]
        if len(result)%4 != 0:
            img64 = result+'='*(4-(len(result)%4))
            output = img64
        else:
            output = result
        message = "Success"
    except Exception as e:
        message = "Error while processing base64"
        output = "There is an error"
        print(e)
        
    return {"Message": message, "output": output}