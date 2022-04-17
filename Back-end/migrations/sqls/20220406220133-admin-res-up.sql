/* Replace with your SQL commands */
CREATE TABLE restrictions(id SERIAL PRIMARY KEY NOT NULL, "resstatus" VARCHAR(50) NOT NULL, "resperiod" VARCHAR(10), "userid" integer REFERENCES user_shop(id))