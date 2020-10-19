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
      SUM(salary) AS budg
    FROM department
    LEFT JOIN role
      ON department.id = role.department_id
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

}

function viewEmpByMgr() {

}

module.exports = {viewAllEmployees, viewAllRoles, viewAllDepartments, viewEmpByDept, viewEmpByMgr}