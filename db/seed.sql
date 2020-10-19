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