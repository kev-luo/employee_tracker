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

function addEmpQuery(fName,lName,role,mgr) {
  return new Promise((resolve, reject) => {
    const queryString = `
    INSERT INTO employee(first_name,last_name,role_id,manager_id)
    SELECT ?, ?, (SELECT id AS role_id FROM role WHERE role.title = ?),
      (SELECT id AS manager_id FROM employee WHERE CONCAT(first_name,' ',last_name) = ?)`;
    let queryParams = [fName,lName,role,mgr]

    db.query(queryString,queryParams,(err,res) => {
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
    
    db.query(queryString,{name:department},(err,res) => {
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

function roleNames() {
  return new Promise((resolve,reject) => {
    db.query(`SELECT title FROM role`, (err,res) => {
      if (err) reject(err);
      let roles = res.map(role => {
        return role.title;
      })
      resolve(roles);
    })
  })
}

function empNames() {
  return new Promise((resolve,reject) => {
    const queryString = `
    SELECT CONCAT(first_name, ' ', last_name) AS name
    FROM employee
    `
    db.query(queryString, (err,res) => {
      if (err) reject(err);
      let emps = res.map(name => {
        return name.name;
      })
      emps.push('None');
      resolve(emps);
    })
  })
}
module.exports = {addEmpQuery, addRoleQuery, addDeptQuery, deptNames, roleNames, empNames}