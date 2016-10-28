from subprocess import call
from time import time, sleep
import os
import cv2
camera = cv2.VideoCapture(0)
sleep(20) #Wait some time so the camera can get ready
ignore, capture = camera.read()
capturePath = os.path.join(os.getcwd(), 'unclassified', '%.0f.jpg' % (time() * 1000))
cv2.imwrite(capturePath, capture)
call('curl -i -X POST -H "Content-Type: multipart/form-data" -F img=@"' + capturePath + '" 52.186.125.81/recognize', shell=True)