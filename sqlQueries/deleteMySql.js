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

function deleteEmp() {

}

function deleteRole() {

}

module.exports = {deleteEmp, deleteRole};