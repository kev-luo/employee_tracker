-- self join example
SELECT 
	CONCAT(e.first_name, ' ', e.last_name) AS Employee,
  CONCAT(m.first_name, ' ', m.last_name) AS Manager
FROM employee e
LEFT JOIN employee m
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

-- incorrect implementation view all employees
SELECT 
	CONCAT(e.first_name, ' ', e.last_name) AS Employee,
    title,
    name AS department,
    salary,
    CONCAT(m.first_name, ' ', m.last_name) AS Manager
FROM employee e
LEFT JOIN employee m
	ON e.id = m.manager_id
LEFT JOIN role
	ON role.id = e.role_id
LEFT JOIN department
	ON role.department_id = department.id
ORDER BY Employee

-- correct implementation view all employees
SELECT 
    e.id as empId,
	  CONCAT(e.first_name, ' ', e.last_name) AS emp,
    title,
    name AS dept,
    salary,
    CONCAT(m.first_name, ' ', m.last_name) AS mgr
FROM employee e
LEFT JOIN employee m
	ON m.id = e.manager_id
LEFT JOIN role
	ON role.id = e.role_id
LEFT JOIN department
	ON role.department_id = department.id
ORDER BY e.id

-- view all roles
SELECT 
  role.id AS id,
  title AS role,
  name AS dept,
  salary
FROM department
LEFT JOIN role
  ON department.id = role.department_id
ORDER BY id

-- view all departments
SELECT
	department.id AS id,
  name,
  SUM(salary) AS budg
FROM department
LEFT JOIN role
  ON department.id = role.department_id
GROUP BY name
ORDER BY id

-- view all employees by department
