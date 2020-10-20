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

function addEmpQuery(employee) {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO employee SET ?`;
    
    db.query(queryString,employee,(err,res) => {
      if (err) reject(err);
      // db.end();
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
      // db.end();
      return resolve("Role added");
    })
  })
}

function addDeptQuery(department) {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO department SET ?`;
    
    db.query(queryString,department,(err,res) => {
      if (err) reject(err);
      // db.end();
      return resolve("Department added");
    })
  })
}

function deptNames() {
  return new Promise((resolve,reject) => {
    db.query(`SELECT name FROM department`, (err,res) => {
      if (err) reject(err);
      let depts = res.map(name => {
        return name.name;
      })
      resolve(depts);
    })
  })
}
module.exports = {addEmpQuery, addRoleQuery, addDeptQuery, deptNames}