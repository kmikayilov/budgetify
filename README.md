# Budgetify app

 - This web application is built on React.TS and Python Django
 - It is used to keep track of your daily incomes and expenses

## To install the project, it is required to:

### Front End
 - Go to the app frontend directory (budgetify_front)
 - npm install
 - npm start

### Back End
 - Go to the app backend directory (budgetify_back)
 - python -m venv env
 - env\Scripts\activate
 - python -m pip install -r ./requirements.txt
 - python manage.py migrate ( Look at DB connection instructions)
 - python manage.py loaddata ./data.json
 - python manage.py runserver


### DB connection
 - I use the PostgreSQL for db connections, but it could take time to change from my connection details to yours, so it also can be done on sqLite file db, that is why I commented postgreSQL db connection details
