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
    let queryString = `SELECT * FROM employee`;
    db.query(queryString, (err,res) => {
      if (err) reject(err);
      let arrayData = res.map(employee => {
        return [employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id]
      });

      // db.end();
      return resolve(arrayData);
    });
  })
};

function viewAllRoles() {
  return new Promise((resolve, reject) => {
    let queryString = `SELECT * FROM role`;
    db.query(queryString,(err,res) => {
      if (err) reject(err);
      let arrayData = res.map(role => {
        return [role.id, role.title, role.salary, role.department_id]
      });

      // db.end();
      return resolve(arrayData);
    });
  })
}

function viewAllDepartments() {
  return new Promise((resolve, reject) => {
    let queryString = `SELECT * FROM department`;
    db.query(queryString,(err,res) => {
      if (err) reject(err);
      let arrayData = res.map(department => {
        return [department.id, department.name]
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