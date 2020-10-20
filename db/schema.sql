DROP DATABASE IF EXISTS employee_trackerdb;

CREATE DATABASE employee_trackerdb;

CREATE TABLE department(
  id INT AUTO_INCREMENT,
  name VARCHAR(30),       
  PRIMARY KEY(id)         -- role table FK references this
  );

CREATE TABLE role(
  id INT AUTO_INCREMENT,
  title VARCHAR(30),      
  salary INT,              
  department_id INT,      -- FK references department table (id)
  PRIMARY KEY(id),         -- employee table FK (role_id) references this
  FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
  );

CREATE TABLE employee(    -- self-referential
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30), 
  last_name VARCHAR(30),  
  role_id INT,            -- FK references role table (id)
  manager_id INT,         -- FK reference to another employee (manager of employee) may be null
  PRIMARY KEY(id),        -- employee table FK (manager_id) references this
  FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    );

-- remove employee
employee name (list)

-- update employee manager
employee whose manager you want to update (list)
which employee do you want to set as manager for selected employee (list)

-- update employee role
