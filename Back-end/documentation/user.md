# API Endpoints

## Users

**POST request "/createuser" : to create new User in database**

- You will send json object in post request like this:

```json
{
  "firstName": "Mohammed",
  "lastName": "Salah",
  "email": "mohammedsalah605s5@gmail.com",
  "password": "Mohammed123#",
  "responsibility": "Admin"
}
```

**PUT request "/verify/:id" : to verify new User in database**

**POST request "/login" : to login User account**

- You will send json object in post request like this:

```json
{
  "email": "mohammedsalah6055@gmail.com",
  "password": "Mohammed123#"
}
```
