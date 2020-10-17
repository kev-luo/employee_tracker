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
  const queryString = `INSERT INTO employee SET ?`;
  
  db.query(queryString,employee,(err,res) => {
    if (err) throw err;
    console.log(res);
    db.end();
  })
}

function addRoleQuery(role) {
  const queryString = `INSERT INTO role SET ?`;
  
  db.query(queryString,role,(err,res) => {
    if (err) throw err;
    console.log(res);
    db.end();
  })
}

function addDeptQuery(department) {
  const queryString = `INSERT INTO department SET ?`;
  
  db.query(queryString,department,(err,res) => {
    if (err) throw err;
    console.log(res);
    db.end();
  })
}

module.exports = {addEmpQuery, addRoleQuery, addDeptQuery}