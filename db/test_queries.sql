------------------------------------------------------------------------view all employees
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
ORDER BY dept

----------------------------------------------------------------------------view all roles
SELECT 
  role.id AS id,
  title AS role,
  name AS dept,
  salary
FROM role
LEFT JOIN department
  ON department.id = role.department_id
ORDER BY id

------------------------------------------------------------view all departments budgets
SELECT
  department.id AS id,
  name,
  COUNT(employee.id) AS emp_count,
  SUM(salary) AS budg
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department
ON department.id = role.department_id
GROUP BY name

----------------------------------------------------------view all employees by department
SELECT
  department.name AS dept,
  title,
  CONCAT(first_name, ' ', last_name) AS name
FROM employee
LEFT JOIN role
  ON employee.role_id = role.id
LEFT JOIN department
  ON role.department_id = department.id
ORDER BY dept

------------------------------------------------------------view all employees by manager
SELECT 
  name,
  IFNULL(CONCAT(m.first_name, ' ', m.last_name),'Dept Head') AS mgr,
  CONCAT(e.first_name, ' ', e.last_name) AS emp
FROM employee e
LEFT JOIN employee m
  ON m.id = e.manager_id
LEFT JOIN role
  ON e.role_id = role.id
LEFT JOIN department
  ON department.id = role.department_id
ORDER BY name

