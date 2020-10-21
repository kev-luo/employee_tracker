const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'kevin',
  password: 'mipassword',
  database: 'employee_trackerdb'
})

db.connect(err => {
  if (err) throw err;
})

function addEmpQuery(fName,lName,role,mgr) {
  return new Promise((resolve, reject) => {
    const queryString = `
    INSERT INTO employee(first_name,last_name,role_id,manager_id)
    SELECT ?, ?, (SELECT id AS role_id FROM role WHERE role.title = ?),
      (SELECT id AS manager_id FROM employee WHERE CONCAT(first_name,' ',last_name) = ?)`;
    let queryParams = [fName,lName,role,mgr]

    db.query(queryString,queryParams,(err,res) => {
      if (err) reject(err);

      return resolve("Employee added");
    })
  })
}

function addRoleQuery(title,salary,dept) {
  return new Promise((resolve, reject) => {
    const queryString = `
    INSERT INTO role(title,salary,department_id)
    SELECT ?, ?, id
    FROM department
    WHERE name = ?`;
    let queryParams = [title,salary,dept]
    
    db.query(queryString,queryParams,(err,res) => {
      if (err) reject(err);

      return resolve("Role added");
    })
  })
}

function addDeptQuery(department) {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO department SET ?`;
    
    db.query(queryString,{name:department},(err,res) => {
      if (err) reject(err);

      return resolve("Department added");
    })
  })
}

module.exports = {addEmpQuery, addRoleQuery, addDeptQuery}