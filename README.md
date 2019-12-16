# oware_web_app
Web app implementation of the game Oware created with the Django framework.

For this project I rewrote code from my Oware.java project in python and created a web interface using the Django
framework and javascript to run the game Oware between a human player vs. computer. The computer move is generated using 
a min-max algorithm with alpha-beta pruning.

To run the website on a test server:
1. Install Django, instructions to do so can be found here https://docs.djangoproject.com/en/3.0/intro/install/
2. Navigate to the project folder containing manage.py
3. A test server can be created by running the following command:
  $ python manage.py runserver [ip] [port]

This will create a test server at 127.0.0.1:8000 by default, you can optionally specify [ip] and [port] but ip address must be
in the oware/settings.py file 'allowed hosts'
