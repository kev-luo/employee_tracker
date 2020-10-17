const inquirer = require('inquirer');
const Table = require('cli-table');
const mysql = require('mysql');
const initialQuestions = require('./inquirerQuestions/whatNext');
const {Employee,Role,Department} = require('./inquirerQuestions/tableClasses');
const create = require('./inquirerQuestions/create');
const addMySql = require('./sqlQueries/addMySql');

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

// switch case here based on initial question response
async function begin() {
  let initialAnswer = await initialQuestions.whatNext();
  let manipulateDbParam;
  switch (initialAnswer.choice) {
    case 'View':
      manipulateDbParam = await initialQuestions.viewDb();
      viewThis(manipulateDbParam); // arg is what the user specifically wants to view
      break;
    case 'Add':
      manipulateDbParam = await initialQuestions.addToDb();
      addThis(manipulateDbParam); // arg is what the user specifically wants to add
      break;
    case 'Update':
      manipulateDbParam = await initialQuestions.updateDb();
      updateThis(manipulateDbParam); // arg is what the user specifically wants to update
      break;
  }
};

async function viewThis(manipulateDbParam) {
  return manipulateDbParam
};

async function addThis(manipulateDbParam) {
  let newEntryInfo;
  let newEntryObject;

  switch (manipulateDbParam) {
    case 'New employee':
      newEntryInfo = await create.addEmployee();
      newEntryObject = new Employee(newEntryInfo.firstName, newEntryInfo.lastName, parseInt(newEntryInfo.roleId, parseInt(newEntryInfo.managerId)))
      await addMySql.addEmpQuery(newEntryObject);
      console.log('New employee added');
      break;
    case 'New role':
      newEntryInfo = await create.addRole();
      newEntryObject = new Role(newEntryInfo.title, parseInt(newEntryInfo.salary), parseInt(newEntryInfo.deptId))
      await addMySql.addRoleQuery(newEntryObject);
      console.log('New role added');
      break;
    case 'New department':
      newEntryInfo = await create.addDept();
      newEntryObject = new Department(newEntryInfo.name)
      await addMySql.addDeptQuery(newEntryObject);
      console.log('New department added');
      break;
  }
};

async function updateThis(manipulateDbParam) {
  return manipulateDbParam
};


begin();
// call table classes with add/delete/read/update inquirer response
// make mysql query using newly created object