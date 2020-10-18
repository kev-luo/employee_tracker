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

function updateEmpRole(empInfo) {
  let queryString = `UPDATE employee SET ? WHERE ?`
  let params = 
  [
    {role_id: `${parseInt(empInfo.role_id)}` }, 
    {id:      `${parseInt(empInfo.id)}` }
  ];
  db.query(queryString, params, (err,res) => {
    if (err) throw err;
    console.log("employee role updated");
  });
}

function updateEmpMgr(empInfo) {
  let queryString = `UPDATE employee SET ? WHERE ?`
  let params = 
  [
    {manager_id: `${parseInt(empInfo.manager_id)}` }, 
    {id:      `${parseInt(empInfo.id)}` }
  ];
  db.query(queryString, params, (err,res) => {
    if (err) throw err;
    console.log("employee manager updated");
  });
}

module.exports = {updateEmpRole, updateEmpMgr};