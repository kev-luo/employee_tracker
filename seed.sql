DROP DATABASE IF EXISTS employee_trackerdb;

CREATE DATABASE employee_trackerdb;

CREATE TABLE department(
  id INT AUTO_INCREMENT,
  name VARCHAR(30), -- hold department name
  PRIMARY KEY(id)
  );

CREATE TABLE role(
  id INT AUTO_INCREMENT,
  title VARCHAR(30), -- hold role title
  salary INT         -- hold role salary
  PRIMARY KEY(id)
  );

CREATE TABLE employee(
id INT AUTO_INCREMENT,
first_name VARCHAR(30), -- employee first name
last_name VARCHAR(30),  -- employee last name
role_id INT,            -- reference to employee role
manager_id INT,         -- reference to another employee (manager of employee) may be null
PRIMARY KEY(id)
  );

