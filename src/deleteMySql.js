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

function deleteEmp(name) {
  return new Promise((resolve,reject) => {
    let queryString = `DELETE FROM employee WHERE CONCAT(first_name,' ',last_name) = ?`
    db.query(queryString, [name], (err, res) => {
      if (err) reject(err);
      return resolve("Employee deleted");
    })
  })
}

function deleteRole(role) {
  return new Promise((resolve, reject) => {
    let queryString = `DELETE FROM role WHERE title = ?`
    db.query(queryString, [role], (err, res) => {
      if (err) reject(err);
      return resolve("Role deleted");
    })
  })
}

function deleteDept(dept) {
  return new Promise((resolve, reject) => {
    let queryString = `DELETE FROM department WHERE name = ?`
    db.query(queryString, [dept], (err, res) => {
      if (err) reject(err);
      return resolve("Department deleted");
    })
  })
}

module.exports = {deleteEmp, deleteRole, deleteDept};