/* Replace with your SQL commands */
CREATE TABLE user_shop(id SERIAL PRIMARY KEY,first_name VARCHAR(50) NOT NULL,last_name VARCHAR(50) NOT NULL ,email VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,responsibility VARCHAR(50) NOT NULL,status VARCHAR(50),restrictions VARCHAR(50) NOT NULL,jwt VARCHAR(600),unid VARCHAR(50));
