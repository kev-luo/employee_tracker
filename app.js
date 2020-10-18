const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const initialQuestions = require('./inquirerQuestions/initialQuestions');
const {Employee,Role,Department} = require('./inquirerQuestions/tableClasses');
const create = require('./inquirerQuestions/create');
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
    View: {

    },
    Add: {
      type: 'list',
      name: 'crud',
      message: 'What would you like to add?',
      choices: ['New employee','New role','New department','Go Back']
    },
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

function viewOptions(op) {
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

async function addThis(manipulateDbParam) {
  let newEntryInfo;
  let newEntryObject;

  switch (manipulateDbParam) {
    case 'New employee':
      newEntryInfo = await create.addEmployee(); // details needed to create new class instance
      newEntryObject = new Employee(newEntryInfo.firstName, newEntryInfo.lastName, parseInt(newEntryInfo.roleId, parseInt(newEntryInfo.managerId))) // create new class instance
      await addMySql.addEmpQuery(newEntryObject); // call fxn to add data to mySQL
      console.log('New employee added');
      break;
    case 'New role':
      newEntryInfo = await create.addRole(); // details needed to create new class instance
      newEntryObject = new Role(newEntryInfo.title, parseInt(newEntryInfo.salary), parseInt(newEntryInfo.deptId)) // create new class instance
      await addMySql.addRoleQuery(newEntryObject); // call fxn to add data to mySQL
      console.log('New role added');
      break;
    case 'New department':
      newEntryInfo = await create.addDept(); // details needed to create new class instance
      newEntryObject = new Department(newEntryInfo.name) // create new class instance
      await addMySql.addDeptQuery(newEntryObject); // call fxn to add data to mySQL
      console.log('New department added');
      break;
  }
};

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