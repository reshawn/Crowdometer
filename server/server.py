from flask import Flask, request
import os
from subprocess import call
import json

app = Flask(__name__, static_url_path='/static/')

@app.route('/static/<path:path>')
def static_file(path):
    if (path == 'index.html'): return 'Go to admin page'
    return app.send_static_file(path)

@app.route('/admin')
def admin():
    return app.send_static_file('index.html')

@app.route('/recognize', methods=['POST'])
def recognize():
    img = request.files['img']
    img.save(os.path.join(os.getcwd(), 'img.jpg'))

    call('matlab -nodisplay -nosplash -nodesktop -r "run(\'' + os.path.join(os.getcwd(), 'detect.m') + '\');exit;"')
        
    return 'Done'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)