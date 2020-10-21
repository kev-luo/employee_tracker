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

function viewAllEmployees() {
  return new Promise((resolve, reject) => {
    let queryString = `
    SELECT 
      e.id as empId,
      CONCAT(e.first_name, ' ', e.last_name) AS emp,
      title,
      name AS dept,
      salary,
      CONCAT(m.first_name, ' ', m.last_name) AS mgr
    FROM employee e
    LEFT JOIN employee m
      ON m.id = e.manager_id
    LEFT JOIN role
      ON role.id = e.role_id
    LEFT JOIN department
      ON role.department_id = department.id
    ORDER BY dept`;

    db.query(queryString, (err,res) => {
      if (err) reject(err);
      let arrayData = res.map(emp => {
        return [emp.empId, emp.emp, emp.title, emp.dept, emp.salary, emp.mgr]
      });

      return resolve(arrayData);
    });
  })
};

function viewAllRoles() {
  return new Promise((resolve, reject) => {
    let queryString = `
    SELECT 
      role.id AS id,
      title AS role,
      name AS dept,
      salary
    FROM role
    LEFT JOIN department
      ON department.id = role.department_id
    ORDER BY id`;

    db.query(queryString,(err,res) => {
      if (err) reject(err);
      let arrayData = res.map(role => {
        return [role.id, role.role, role.dept, role.salary]
      });

      return resolve(arrayData);
    });
  })
}

function viewAllDepts() {
  return new Promise((resolve,reject) => {
    db.query(`SELECT * FROM department`, (err,res) => {
      if (err) reject (err);
      let arrayData = res.map(dept => {
        return [dept.id, dept.name]
      })
      return resolve(arrayData);
    })
  })
}

function viewEmpByDept() {
  return new Promise((resolve, reject) => {
    let queryString = `
    SELECT
      department.name AS dept,
      title,
      CONCAT(first_name, ' ', last_name) AS name
    FROM employee
    LEFT JOIN role
      ON employee.role_id = role.id
    LEFT JOIN department
      ON role.department_id = department.id
    ORDER BY dept`;

    db.query(queryString,(err,res) => {
      if (err) reject(err);
      let arrayData = res.map(emp => {
        return [emp.dept, emp.title, emp.name]
      });

      return resolve(arrayData);
    });
  })
}

function viewEmpByMgr() {
  return new Promise((resolve, reject) => {
    let queryString = `
    SELECT 
      name,
      IFNULL(CONCAT(m.first_name, ' ', m.last_name),'Dept Head') AS mgr,
      CONCAT(e.first_name, ' ', e.last_name) AS emp
    FROM employee e
    LEFT JOIN employee m
      ON m.id = e.manager_id
    LEFT JOIN role
      ON e.role_id = role.id
    LEFT JOIN department
      ON department.id = role.department_id
    ORDER BY name`;

    db.query(queryString,(err,res) => {
      if (err) reject(err);
      let arrayData = res.map(emp => {
        return [emp.name, emp.mgr, emp.emp]
      });

      return resolve(arrayData);
    });
  })
}

function viewDeptBudg() {
  return new Promise((resolve, reject) => {
    let queryString = `
    SELECT
      department.id AS id,
      name,
      COUNT(employee.id) AS emp_count,
      SUM(salary) as budg
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department
    ON department.id = role.department_id
    GROUP BY name`;

    db.query(queryString,(err,res) => {
      if (err) reject(err);
      let arrayData = res.map(dept => {
        return [dept.id, dept.name, dept.emp_count, dept.budg]
      });
      
      return resolve(arrayData);
    });
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
      resolve(emps);
    })
  })
}

function empNamesMgr() {
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

module.exports = {viewAllEmployees, viewAllRoles, viewAllDepts, viewEmpByDept, viewEmpByMgr, viewDeptBudg, deptNames, roleNames, empNames, empNamesMgr}