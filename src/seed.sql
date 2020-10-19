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

INSERT INTO department (name)
VALUES ('Sales'),('Engineering'),('Finance'),('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Finance Director', 120000, 3),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 150000, 4)

INSERT INTO employee (first_name, last_name, role_id)
VALUES
  ('Ron', 'Chee', 1),
  ('Harry', 'Cox', 3),
  ('Anita', 'Bath', 5),
  ('Sarah', 'Lourd', 7)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Colin', 'Forsecs', 2, 1),
  ('Annie', 'Position', 2, 1),
  ('Roch', 'Myaz', 4, 2),
  ('Elon', 'Musk', 4, 2),
  ('Vitalik', 'Buterin', 4, 2),
  ('Malia', 'Brown', 6, 3),
  ('Tom', 'Allen', 8, 4)

-- self join example
SELECT 
	CONCAT(e.first_name, ' ', e.last_name) AS Employee,
  CONCAT(m.first_name, ' ', m.last_name) AS Manager
FROM employee e
INNER JOIN employee m
	ON e.id = m.manager_id

-- multiple table join example
SELECT 
	employee.id,
  first_name, 
  last_name,
	title, 
  name AS department, 
	salary
FROM role
LEFT JOIN department
	ON role.department_id = department.id
LEFT JOIN employee
	ON role.id = employee.role_id
GROUP BY employee.id;