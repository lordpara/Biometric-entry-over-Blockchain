# Biometric-entry-over-Blockchain
A Biometric entry system using face recognition to identify members and enter the entry and exit timestamps of the members

# How to Run this Application
1. Install all the dependencies in the Biometric Section
2. Install all the dependencies in the python section
3. Run the Flask App on a local server by running the app.py from python console
4. Run the React app on local server - npm start
5. Make sure the Browser has Webcam permission

# How does it work
##Register Member
When a new member has to be entered into the system, the system captures the image from the live webcam. Enter the Member Information and submit the form. The information is passed to the flask API and details are added into the member database and the base64 Image is converted to a jpg form and stored in the databased to later identification.whi

## Identify Member
When a member enters the building, the camare captures the image and sends it to the API for identification. The API returns the member information. Then themember ID along with the current timestamp is stored into the smart contract as a log which can be later used for security purpose. 

## Future Scope
This system can be used to link up the account address of these member to perform transactions or any other interaction with the smart contract and the smart contract can be designed as per the needs.
