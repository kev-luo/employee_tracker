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

function updateEmpRole(name,role) {
  return new Promise((resolve, reject) => {
    let queryString = `
    UPDATE employee 
    SET role_id = (SELECT id FROM role WHERE title = ?) 
    WHERE CONCAT(first_name,' ',last_name) = ?`;
    let queryParams = [role,name];

    db.query(queryString, queryParams, (err,res) => {
      if (err) reject(err);
      return resolve("Employee role updated");
    });
  })
}

function updateEmpMgr(emp_name,mgr_name) {
  return new Promise((resolve, reject) => {
    let queryString;
    let queryParams;
    switch(mgr_name) {
      case 'None':
        queryString = `UPDATE employee SET manager_id = null WHERE CONCAT(employee.first_name,' ',employee.last_name) = ?`
        queryParams = [emp_name]
        db.query(queryString, queryParams, (err,res) => {
          if (err) reject(err);
          return resolve("Employee manager updated");
        });
        break;
        
      default:
        queryString = `
        UPDATE employee,
          (SELECT id FROM employee WHERE CONCAT(first_name,' ',last_name)= ?) 
            AS mgr_id
        SET employee.manager_id = mgr_id.id
        WHERE CONCAT(employee.first_name,' ',employee.last_name) = ?`
        queryParams = [mgr_name,emp_name]
        db.query(queryString, queryParams, (err,res) => {
          if (err) reject(err);
          return resolve("Employee manager updated");
        });
        break;
    }
  })
}

function updateRoleDept(role,dept) {
  return new Promise((resolve, reject) => {
    let queryString = `
      UPDATE role
      SET department_id = (SELECT id FROM department WHERE name = ?)
      WHERE title = ?`
    let queryParams = [dept, role]

    db.query(queryString, queryParams, (err,res) => {
      if (err) reject(err);
      return resolve("Role updated");
    })
  })
}

module.exports = {updateEmpRole, updateEmpMgr, updateRoleDept};