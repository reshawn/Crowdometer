import pyrebase
import os
from time import time
from datetime import datetime
from subprocess import call
import sys

Firebase = pyrebase.initialize_app({
  'apiKey': 'AIzaSyB1XqagZOMhQ9_dcypmT3m8HZj9GEfPK0k',
  'authDomain': 'crowd-detection.firebaseapp.com',
  'databaseURL': 'https://crowd-detection.firebaseio.com',
  'storageBucket': 'crowd-detection.appspot.com',
  'serviceAccount': 'CrowdDetection-ce4d1e52cf08.json'
})

result = sys.argv[1]
timestamp  = time()
datestr = datetime.fromtimestamp(timestamp).strftime('%Y/%B/%d') #Get the date information to store in history
timestamp = timestamp * 1000 #Multiply by 1000 since Python give timestamp in seconds and the JavaScript needs it in milliseconds

densityInfo = {
    'result': result,
    'timestamp': timestamp
}

database = Firebase.database()
database.child('latest').set(densityInfo) #Set the latest value
database.child('detected').child(datestr).push(densityInfo) #Push data to history

call('move "' + os.path.join(os.getcwd(), 'img.jpg') + '" "' +  os.path.join(os.getcwd(), 'classified', result, ("%.0f.jpg" % timestamp)) + '"', shell=True)