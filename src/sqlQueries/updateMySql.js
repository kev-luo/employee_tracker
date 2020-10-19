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

function updateEmpRole(id,roleId) {
  return new Promise((resolve, reject) => {
    let queryString = `UPDATE employee SET ? WHERE ?`
    let params = 
    [
      {role_id: `${parseInt(roleId)}`}, 
      {id: `${parseInt(id)}`}
    ];
    db.query(queryString, params, (err,res) => {
      if (err) reject(err);
      return resolve("Employee role updated");
    });
  })
}

function updateEmpMgr(id,mgrId) {
  return new Promise((resolve, reject) => {
    let queryString = `UPDATE employee SET ? WHERE ?`
    let params = 
    [
      {manager_id: `${parseInt(mgrId)}`}, 
      {id: `${parseInt(id)}`}
    ];
    db.query(queryString, params, (err,res) => {
      if (err) reject(err);
      return resolve("Employee manager updated");
    });
  })
}

module.exports = {updateEmpRole, updateEmpMgr};