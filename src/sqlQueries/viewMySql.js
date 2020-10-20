const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'kevin',
  password: 'mipassword',
  database: 'employee_trackerdb'
});

db.connect(err => {
  if (err) throw err;
});

function viewAllEmployees() {
  return new Promise((resolve, reject) => {
    let queryString = `
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
    ORDER BY e.id`;

    db.query(queryString, (err,res) => {
      if (err) reject(err);
      let arrayData = res.map(emp => {
        return [emp.empId, emp.emp, emp.title, emp.dept, emp.salary, emp.mgr]
      });

      // db.end();
      return resolve(arrayData);
    });
  })
};

function viewAllRoles() {
  return new Promise((resolve, reject) => {
    let queryString = `
    SELECT 
      role.id AS id,
      title AS role,
      name AS dept,
      salary
    FROM department
    LEFT JOIN role
      ON department.id = role.department_id
    ORDER BY id`;

    db.query(queryString,(err,res) => {
      if (err) reject(err);
      let arrayData = res.map(role => {
        return [role.id, role.role, role.dept, role.salary]
      });

      // db.end();
      return resolve(arrayData);
    });
  })
}

function viewAllDepartments() {
  return new Promise((resolve, reject) => {
    let queryString = `
    SELECT
      department.id AS id,
      name,
      (SUM(salary)*COUNT(role_id)) AS budg
    FROM department
    LEFT JOIN role
      ON department.id = role.department_id
    LEFT JOIN employee
      ON role.id = employee.role_id
    GROUP BY name
    ORDER BY id`;

    db.query(queryString,(err,res) => {
      if (err) reject(err);
      let arrayData = res.map(dept => {
        return [dept.id, dept.name, dept.budg]
      });
      // db.end();
      return resolve(arrayData);
    });
  })
}

function viewEmpByDept() {
  return new Promise((resolve, reject) => {
    let queryString = `
    SELECT
      department.name AS dept,
      title,
      CONCAT(first_name, ' ', last_name) AS name
    FROM department
    LEFT JOIN role
      ON department.id = role.department_id
    LEFT JOIN employee
      ON role.id = employee.role_id
    ORDER BY dept`;

    db.query(queryString,(err,res) => {
      if (err) reject(err);
      let arrayData = res.map(emp => {
        return [emp.dept, emp.title, emp.name]
      });
      // db.end();
      return resolve(arrayData);
    });
  })
}

function viewEmpByMgr() {
  return new Promise((resolve, reject) => {
    let queryString = `
    SELECT 
      name,
      IFNULL(CONCAT(m.first_name, ' ', m.last_name),'DeptLead') AS mgr,
      CONCAT(e.first_name, ' ', e.last_name) AS emp
    FROM employee e
    LEFT JOIN employee m
      ON m.id = e.manager_id
    LEFT JOIN role
      ON e.role_id = role.id
    LEFT JOIN department
      ON department.id = role.department_id
    ORDER BY name`;

    db.query(queryString,(err,res) => {
      if (err) reject(err);
      let arrayData = res.map(emp => {
        return [emp.name, emp.mgr, emp.emp]
      });
      // db.end();
      return resolve(arrayData);
    });
  })
}

module.exports = {viewAllEmployees, viewAllRoles, viewAllDepartments, viewEmpByDept, viewEmpByMgr}