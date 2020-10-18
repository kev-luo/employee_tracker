const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const {Employee,Role,Department} = require('./inquirerQuestions/tableClasses');
const update = require('./inquirerQuestions/update');
const addMySql = require('./sqlQueries/addMySql');
const viewMySql = require('./sqlQueries/viewMySql');
const updateMySql = require('./sqlQueries/updateMySql');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'kevin',
//   password: 'mipassword',
//   database: 'employee_trackerdb'
// })

// db.connect((err,res) => {
//   if (err) throw err;
//   console.log(res);
// })



let crudQuestions = [
  {
    Update: {
      type: 'list',
      name: 'crud',
      message: 'What would you like to update?',
      choices: ['Employee role', 'Employee manager', 'Go Back']
    },
    Remove: {
      type: 'list',
      name: 'crud',
      message: 'What would you like to delete?',
      choices: ['Employee', 'Role']
    }
  }
]

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
        return removeOptions();
      case 'Exit':
        console.log('bye');
        process.exit();
    }
  })
}

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
        tableHead = ['ID','First Name','Last Name','Role ID','Manager ID']
        break;
      case 'All roles':
        queryData = await viewMySql.viewAllRoles();
        tableHead = ['ID','Title','Salary','Department ID']
        break;
      case 'All departments':
        queryData = await viewMySql.viewAllDepartments();
        tableHead = ['ID','Dept Name']
        break;
      case 'All employees by department':
        break;
      case 'All employees by manager':
        break;
      case 'Go Back':
        break;
    }

    console.table(tableHead,queryData);
    main();
  })
}

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
        break;
    }
  })
}

function addEmployee() {
  let question = 
  [
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?"
    },
    {
      type: 'input',
      name: 'roleId',
      message: "What is the employee's role ID?"
    },
    {
      type: 'input',
      name: 'managerId',
      message: "(Optional) What is their manager's ID?"
    },
  ]
  inquirer.prompt(question).then(async (emp) => {
    let newEmp = new Employee(emp.firstName, emp.lastName, parseInt(emp.roleId), parseInt(emp.managerId));
    let mySqlRes = await addMySql.addEmpQuery(newEmp);
    console.log(mySqlRes);
    return main();
  })
}

function addRole() {
  let question = 
  [
    {
      type: 'input',
      name: 'title',
      message: "What is the title of the new role?"
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the salary of the new role?"
    },
    {
      type: 'input',
      name: 'deptId',
      message: "What is the department ID of the new role?"
    }
  ]
  inquirer.prompt(question).then(async (role) => {
    let newRole = new Role(role.title, parseInt(role.salary), parseInt(role.deptId));
    let mySqlRes = await addMySql.addRoleQuery(newRole);
    console.log(mySqlRes);
    return main();
  })
}

function addDept() {
  let question = {
    type: 'input',
    name: 'name',
    message: "What is the name of the new department?"
  }
  inquirer.prompt(question).then(async (dept) => {
    let newDept = new Department(dept.name);
    let mySqlRes = await addMySql.addDeptQuery(newDept);
    console.log(mySqlRes);
    return main();
  })
}

async function updateThis(manipulateDbParam) {
  await viewMySql.viewAllEmployees();
  
  let empInfo;

  setTimeout( async () => {
    switch (manipulateDbParam) {
      case 'Employee role':
        empInfo = await update.empRoleQs();
        await updateMySql.updateEmpRole(empInfo);
        break;
      case 'Employee manager':
        empInfo = await update.empMgrQs();
        await updateMySql.updateEmpMgr(empInfo);
        break;
    }
  },1000)
  
};


main();
// call table classes with add/delete/read/update inquirer response
// make mysql query using newly created object