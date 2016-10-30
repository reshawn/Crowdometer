# Crowdometer by TG

## Server Requirements
- Windows Server 2012 R2
- Python
    - Flask
    - pyrebase
- Matlab with Image Processing and Computer Vision Products Installed

## Raspberry Pi Requirements
- Python
- Camera

## Database Solution
- Firebase

## Hosting Solution
- Windows Azure Virtual Machine

## Server Functions
- Crowd Detection using Matlab
- Admin Panel to view previous data

## Raspbery Pi Client Functions
- Take pictures for server

## Mobile App Functions
- View latest density information
- View past density information

## Server Setup Instructions
- pip install -r Requirements.txt

## Mobile App Build Instructions
- npm install -g cordova ionic
- ionic build android


## Running Instructions
- Start the server using 'python server.py'
- Setup Raspberry Pi to take picture every 5 minutes using cron
- View the app to see the latest readings or check the admin panel to view history