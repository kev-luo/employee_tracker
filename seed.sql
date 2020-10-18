DROP DATABASE IF EXISTS employee_trackerdb;

CREATE DATABASE employee_trackerdb;

CREATE TABLE department(
  id INT AUTO_INCREMENT,
  name VARCHAR(30), -- hold department name
  PRIMARY KEY(id)   -- references role table
  );

CREATE TABLE role(
  id INT AUTO_INCREMENT,
  title VARCHAR(30), -- hold role title
  salary INT         -- hold role salary
  department_id INT  -- FK references employee table
  PRIMARY KEY(id)
  );

CREATE TABLE employee(  -- self-referential
id INT AUTO_INCREMENT,
first_name VARCHAR(30), -- employee first name
last_name VARCHAR(30),  -- employee last name
role_id INT,            -- FK reference to employee role
manager_id INT,         -- FK reference to another employee (manager of employee) may be null
PRIMARY KEY(id)         
  );

