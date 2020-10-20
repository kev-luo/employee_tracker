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

function deleteEmp(id) {
  return new Promise((resolve,reject) => {
    let queryString = `DELETE FROM employee WHERE ?`
    let params = {id: `${parseInt(id)}`}
    db.query(queryString, params, (err, res) => {
      if (err) reject(err);
      return resolve("Employee deleted");
    })
  })
}

function deleteRole(id) {
  return new Promise((resolve, reject) => {
    let queryString = `DELETE FROM role WHERE ?`
    let params = {id: `${parseInt(id)}`}
    db.query(queryString, params, (err, res) => {
      if (err) reject(err);
      return resolve("Role deleted");
    })
  })
}

function deleteDept(id) {
  return new Promise((resolve, reject) => {
    let queryString = `DELETE FROM department WHERE ?`
    let params = {id: `${id}`}
    db.query(queryString, params, (err, res) => {
      if (err) reject(err);
      return resolve("Department deleted");
    })
  })
}

module.exports = {deleteEmp, deleteRole, deleteDept};