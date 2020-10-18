const inquirer = require('inquirer');
const Table = require('cli-table-redemption');
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
  switch(manipulateDbParam) {
    case 'All employees':
      await viewMySql.viewAllEmployees();
      break;
    case 'All roles':
      await viewMySql.viewAllRoles();
      break;
    case 'All departments':
      await viewMySql.viewAllDepartments();
      break;
  }
  return manipulateDbParam
};

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
        empInfo = update.empRoleQs();
        await updateMySql.updateEmpMgr(empInfo);
        break;
    }
  },1000)
  
};


begin();
// call table classes with add/delete/read/update inquirer response
// make mysql query using newly created object