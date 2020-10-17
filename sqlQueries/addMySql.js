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

function addRoleQuery() {

}

function addDeptQuery() {

}

module.exports = {addEmpQuery, addRoleQuery, addDeptQuery}