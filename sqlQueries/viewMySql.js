const mysql = require('mysql');
const Table = require('cli-table-redemption');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'kevin',
  password: 'mipassword',
  database: 'employee_trackerdb'
});

db.connect(err => {
  if (err) throw err;
});

function viewAllEmployees() {
  let table = new Table({
    head:['id','first name','last name','role id','manager id']
  });
  let queryString = `SELECT * FROM employee`;

  db.query(queryString, (err,res) => {
    if (err) throw err;
    let arrayData = res.map(employee => {
      return [employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id]
    });
    
    for (var i of arrayData) {
      table.push(i);
    }

    db.end();
    console.log(table.toString());
  });
};

function viewAllRoles() {
  let table = new Table({
    head:['id', 'title', 'salary', 'department id']
  });
  let queryString = `SELECT * FROM role`;

  db.query(queryString,(err,res) => {
    if (err) throw err;
    let arrayData = res.map(role => {
      return [role.id, role.title, role.salary, role.department_id]
    });

    for (var i of arrayData) {
      table.push(i);
    }

    console.log(table.toString());
    db.end();
  });
}

function viewAllDepartments() {
  let table = new Table({
    head:['id','name']
  });
  let queryString = `SELECT * FROM department`;

  db.query(queryString,(err,res) => {
    if (err) throw err;
    let arrayData = res.map(department => {
      return [department.id, department.name]
    });

    for (var i of arrayData) {
      table.push(i);
    }

    console.log(table.toString());
    db.end();
  });
}

function viewEmpByDept() {

}

function viewEmpByMgr() {

}

module.exports = {viewAllEmployees, viewAllRoles, viewAllDepartments, viewEmpByDept, viewEmpByMgr}