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

function addRoleQuery(role) {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO role SET ?`;
    
    db.query(queryString,role,(err,res) => {
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

module.exports = {addEmpQuery, addRoleQuery, addDeptQuery}