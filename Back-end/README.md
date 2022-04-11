# Store

## To install this app

- write command:

      npm install

- back-end run on port: 8003
- database run on port: 8002
- database server run on: localhost

### To build your database & user & connection

- In psql terminal:

* To create E-Shop database, write the following command:

      CREATE DATABASE "E_Shop";

* To create E-Shop_Test database, write the following command:

      CREATE DATABASE "E_Shop_Test";

* To create user with password for production database and testing database, write the following command:

      CREATE USER "Mohammed_Salah" WITH PASSWORD 'Mohammed123#';

* To make connection between user and production database, write the following command:

      GRANT ALL PRIVILEGES ON DATABASE "E_Shop" TO "Mohammed_Salah";

* To make connection between user and testing database, write the following command:

      GRANT ALL PRIVILEGES ON DATABASE "E_Shop_Test" TO "Mohammed_Salah";

### You need to add .env in root

POSTGRS_HOST=localhost  
POSTGRS_DB=E_Shop  
POSTGRS_USER=Mohammed_Salah  
POSTGRS_PASSWORD=Mohammed123#  
POSTGRS_DB_TEST=E_Shop_Test  
ENV=dev  
PORT=8002  
BCRYPT_PASSWORD=bla-bla-bla-mo-salah  
SALT_ROUNDS=10  
SECRET_KEY=MoSalah  
EMAIL=lomasoma533@gmail.com  
EMAIL_PASS='Maxmam123#'

---

**NOTE**
Don't forget to delete the blank spaces after each variable in the environment.

---

---

**NOTE**
This data is not sensitive and has been added for testing purposes only

---

## How to add table to production database

- db-migrate up: to add all table to database
- db-migrate down: to delete all table from production database

## How to add table to development database

- npm run test: to build your application then, add all table then,run jasmine for unit test then, drop database

## How to run server

- npm run start: to start nodemon package to start live server
