const inquirer = require('inquirer');
const cTable = require('console.table');
const addMySql = require('./src/addMySql');
const viewMySql = require('./src/viewMySql');
const updateMySql = require('./src/updateMySql');
const deleteMySql = require('./src/deleteMySql');
const mysql = require('mysql');

const db = mysql.createConnection({
  host:'localhost',
  port:3306,
  user:'kevin',
  password:'mipassword',
  database:'employee_trackerdb'
})

db.connect((err) => {
  if (err) throw err;
  main();
})

// inquirer not blank validation =======================================================
const cannotBeBlank = input => {
  return (input.length !== 0) ? true : 'This field must be filled.'
}

const onlyNumbers = input => {
  return (/^\d+$/.test(input)) ? true : 'This field can only include numbers.'
}
// begin app ===========================================================================
function main() {
  const question = {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['View','Add','Update','Remove','Exit']
  }
  inquirer.prompt(question).then( ({choice}) => {
    switch (choice) {
      case 'View':
        return viewOptions();
      case 'Add':
        return addOptions();
      case 'Update':
        return updateOptions();
      case 'Remove':
        return deleteOptions();
      case 'Exit':
        db.end();
        console.log('hasta luego');
        process.exit();
    }
  })
}
// select mySQL data queries ===========================================================
function viewOptions() {
  let question = {
    type: 'list',
    name: 'view',
    message: 'What would you like to view?',
    choices: ['All employees','All roles','All departments','All employees by department', 'All employees by manager','Go Back']
  }

  inquirer.prompt(question).then(async ({view}) => {
    let tableHead;
    let queryData;

    switch(view) {
      case 'All employees':
        queryData = await viewMySql.viewAllEmployees();
        tableHead = ['Emp ID','Employee','Title','Dept','Salary','Manager']
        break;
      case 'All roles':
        queryData = await viewMySql.viewAllRoles();
        tableHead = ['Role ID','Role','Dept','Salary']
        break;
      case 'All departments':
        queryData = await viewMySql.viewAllDepartments();
        tableHead = ['Dept ID','Dept','Utilized Budget']
        break;
      case 'All employees by department':
        queryData = await viewMySql.viewEmpByDept();
        tableHead = ['Dept','Role','Employee']
        break;
      case 'All employees by manager':
        queryData = await viewMySql.viewEmpByMgr();
        tableHead = ['Dept','Manager','Employee']
        break;
      case 'Go Back':
        return main();
    }

    console.table(tableHead,queryData);
    main();
  })
}
// insert into mySQL table queries =====================================================
function addOptions() {
  let question = {
    type: 'list',
    name: 'add',
    message: 'What would you like to add?',
    choices: ['New employee','New role','New department','Go Back']
  }

  inquirer.prompt(question).then(async ({add}) => {
    switch (add) {
      case 'New employee':
        return addEmployee();
      case 'New role':
        return addRole();
      case 'New department':
        return addDept();
      case 'Go Back':
        return main();
    }
  })
}

async function addEmployee() {
  let question = 
  [
    {
      type: 'input',
      name: 'fName',
      message: "What is the employee's first name?",
      validate: cannotBeBlank
    },
    {
      type: 'input',
      name: 'lName',
      message: "What is the employee's last name?",
      validate: cannotBeBlank
    },
    {
      type: 'list',
      name: 'role',
      message: "What is this employee's role?",
      choices: await viewMySql.roleNames()
    },
    {
      type: 'list',
      name: 'mgr',
      message: "(Optional) Who is this employee's manager?",
      choices: await viewMySql.empNamesMgr()
    },
  ];
  let {fName,lName,role,mgr} = await inquirer.prompt(question);
  if(mgr === 'None') {
    mgr = null;
  }
  let mySqlRes = await addMySql.addEmpQuery(fName,lName,role,mgr);
  console.log(mySqlRes);
  return main();
}

async function addRole() {
  let question = 
  [
    {
      type: 'input',
      name: 'title',
      message: "What is the title of the new role?",
      validate: cannotBeBlank
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the salary of the new role?",
      validate: onlyNumbers
    },
    {
      type: 'list',
      name: 'dept',
      message: "What department does this role belong to?",
      choices: await viewMySql.deptNames()
    }
  ];
  let {title,salary,dept} = await inquirer.prompt(question);
  let mySqlRes = await addMySql.addRoleQuery(title, parseInt(salary), dept);
  console.log(mySqlRes);
  return main();
}

function addDept() {
  let question = {
    type: 'input',
    name: 'name',
    message: "What is the name of the new department?",
    validate: cannotBeBlank
  }
  inquirer.prompt(question).then(async ({name}) => {
    let mySqlRes = await addMySql.addDeptQuery(name);
    console.log(mySqlRes);
    return main();
  })
}
// update mySQL table queries ==========================================================
function updateOptions() {
  let question = {
    type: 'list',
    name: 'update',
    message: 'What would you like to update?',
    choices: ['Employee role', 'Employee manager', 'Role department', 'Go Back']
  };
  inquirer.prompt(question).then(({update}) => {
    switch (update) {
      case 'Employee role':
        return updateEmpRole();
      case 'Employee manager':
        return updateEmpMgr();
      case 'Role department':
        return updateRoleDept();
      case 'Go Back':
        return main();
    }
  })
}

async function updateEmpRole() {
  let question = 
  [
    {
      type: 'list',
      name: 'name',
      message: "Which employee's role would you like to update?",
      choices: await viewMySql.empNames()
    },
    {
      type: 'list',
      name: 'role',
      message: "What would you like their new role to be?",
      choices: await viewMySql.roleNames()
    }
  ];
  let {name,role} = await inquirer.prompt(question);
  let mySqlRes = await updateMySql.updateEmpRole(name,role);
  console.log(mySqlRes);
  return main();
}

async function updateEmpMgr() {
  let question = 
  [
    {
      type: 'list',
      name: 'emp_name',
      message: "Which employee's manager would you like to update?",
      choices: await viewMySql.empNames()
    },
    {
      type: 'list',
      name: 'mgr_name',
      message: "Who would you like their new manager to be?",
      choices: await viewMySql.empNamesMgr()
    }
  ];
  let {emp_name,mgr_name} = await inquirer.prompt(question);
  let mySqlRes = await updateMySql.updateEmpMgr(emp_name,mgr_name);
  console.log(mySqlRes);
  return main();
}

async function updateRoleDept() {
  let question = 
  [
    {
      type: 'list',
      name: 'role',
      message: "Which role would you like to update the department?",
      choices: await viewMySql.roleNames()
    },
    {
      type: 'list',
      name: 'dept',
      message: 'Which department would you like to add this role to?',
      choices: await viewMySql.deptNames()
    }
  ];
  let {role,dept} = await inquirer.prompt(question);
  let mySqlRes = await updateMySql.updateRoleDept(role,dept);
  console.log(mySqlRes);
  return main();
}
// delete mySQL data queries ============================================================
function deleteOptions() {
  let question = {
    type: 'list',
    name: 'deleteT',
    message: 'What would you like to delete?',
    choices: ['Employee', 'Role', 'Department', 'Go Back']
  }
  inquirer.prompt(question).then(async ({deleteT}) => {
    switch (deleteT) {
      case 'Employee':
        queryData = await viewMySql.empNames();
        if (queryData.length === 0) {
          console.log('There are no employees to delete');
          return main();
        }
        return delEmp();

      case 'Role':
        queryData = await viewMySql.roleNames();
        if (queryData.length === 0) {
          console.log('There are no roles to delete');
          return main();
        }
        return delRole();

      case 'Department':
        queryData = await viewMySql.deptNames();
        if (queryData.length === 0) {
          console.log('There are no departments to delete');
          return main();
        }
        return delDept();
      
      case 'Go Back':
        return main();
    }
  })
}

async function delEmp() {
  let question = 
    {
      type: 'list',
      name: 'name',
      message: "Which employee would you like to remove?",
      choices: await viewMySql.empNames()
    };
  let {name} = await inquirer.prompt(question);
  let mySqlRes = await deleteMySql.deleteEmp(name);
  console.log(mySqlRes);
  return main();
}

async function delRole() {
  let question = 
    {
      type: 'list',
      name: 'role',
      message: "Which role would you like to remove?",
      choices: await viewMySql.roleNames()
    };
  let {role} = await inquirer.prompt(question);
  let mySqlRes = await deleteMySql.deleteRole(role);
    console.log(mySqlRes);
    return main();
}

async function delDept() {
  let question = 
  [
    {
      type: 'list',
      name: 'dept',
      message: "Which dept would you like to remove?",
      choices: await viewMySql.deptNames()
    }
  ]
  let {dept} = await inquirer.prompt(question);
  let mySqlRes = await deleteMySql.deleteDept(dept);
  console.log(mySqlRes);
  return main();
}