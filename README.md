# CoolPics



```
Forum App, with a frontend built in React & Redux and a backend built in Django API.
```

## Live Demo

**This App uses a Heroku free plan, so I am afraid that it takes time to load the pages.**

Check out [FRONTEND LIVE DEMO](https://frontend-coolpics.herokuapp.com) here!!

Check out [API LIVE DEMO](https://backend-coolpics.herokuapp.com) here!!

## ScreenShot
![Screenshot 2022-05-09 at 2 20 13 PM](https://user-images.githubusercontent.com/100840312/167374805-d69ea350-b539-439e-b224-d6ac6d0cab88.png)

## Tech used

```
* Frontend : React & Redux
* Backend : Django
```

## How to Install

1. Git Clone

```
git clone https://github.com/thejas-techis/CoolPics.git
```

2. Backend setting

```
cd backend
Python -m venv env
(For Mac) source env/bin/activate
(For Windows) env/Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
# Open http://127.0.0.1:8000/
```

3. Frontend setting

```
cd frontend
npm install
npm start
# Open http://127.0.0.1:3000/
```