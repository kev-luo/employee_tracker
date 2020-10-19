const inquirer = require('inquirer');
const cTable = require('console.table');
const {Employee,Role,Department} = require('./src/tableClasses');
const addMySql = require('./src/sqlQueries/addMySql');
const viewMySql = require('./src/sqlQueries/viewMySql');
const updateMySql = require('./src/sqlQueries/updateMySql');
const deleteMySql = require('./src/sqlQueries/deleteMySql');

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
        console.log('bye');
        process.exit();
    }
  })
}
// select mySQL data queries ===================================================
// questions to view by dept and by manager
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
        return main();
    }

    console.table(tableHead,queryData);
    main();
  })
}
// insert into mySQL table queries =============================================
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

function addEmployee() {
  let question = 
  [
    {
      type: 'input',
      name: 'fName',
      message: "What is the employee's first name?"
    },
    {
      type: 'input',
      name: 'lName',
      message: "What is the employee's last name?"
    },
    {
      type: 'input',
      name: 'roleId',
      message: "What is the employee's role ID?"
    },
    {
      type: 'input',
      name: 'mgrId',
      message: "(Optional) What is their manager's ID?"
    },
  ]
  inquirer.prompt(question).then(async ({fName,lName,roleId,mgrId}) => {
    let newEmp = new Employee(fName, lName, parseInt(roleId), parseInt(mgrId));
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
  inquirer.prompt(question).then(async ({title,salary,deptId}) => {
    let newRole = new Role(title, parseInt(salary), parseInt(deptId));
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
  inquirer.prompt(question).then(async ({name}) => {
    let newDept = new Department(name);
    let mySqlRes = await addMySql.addDeptQuery(newDept);
    console.log(mySqlRes);
    return main();
  })
}
// update mySQL table queries ==================================================
function updateOptions() {
  let question = {
    type: 'list',
    name: 'update',
    message: 'What would you like to update?',
    choices: ['Employee role', 'Employee manager', 'Go Back']
  }
  inquirer.prompt(question).then(async ({update}) => {
    queryData = await viewMySql.viewAllEmployees();
    tableHead = ['ID','First Name','Last Name','Role ID','Manager ID']
    
    switch (update) {
      case 'Employee role':
        console.table(tableHead,queryData);
        return updateEmpRole();
      case 'Employee manager':
        console.table(tableHead,queryData);
        return updateEmpMgr();
      case 'Go Back':
        return main();
    }
  })
}

function updateEmpRole() {
  let question = 
  [
    {
      type: 'input',
      name: 'id',
      message: "What is the id of the employee you'd like to update?"
    },
    {
      type: 'input',
      name: 'roleId',
      message: "What would you like this employee's new role to be?"
    }
  ]
  inquirer.prompt(question).then(async ({id,roleId}) => {
    let mySqlRes = await updateMySql.updateEmpRole(id,roleId);
    console.log(mySqlRes);
    return main();
  })
}

function updateEmpMgr() {
  let question = 
  [
    {
      type: 'input',
      name: 'id',
      message: "What is the id of the employee you'd like to update?"
    },
    {
      type: 'input',
      name: 'mgrId',
      message: "Who is this employee's new manager?"
    }
  ]
  inquirer.prompt(question).then(async ({id,mgrId}) => {
    let mySqlRes = await updateMySql.updateEmpRole(id,mgrId);
    console.log(mySqlRes);
    return main();
  })
}
// delete mySQL data queries ====================================================
// questions for specifics on deleting employee and role
function deleteOptions() {
  let question = {
    type: 'list',
    name: 'deleteT',
    message: 'What would you like to delete?',
    choices: ['Employee', 'Role', 'Department']
  }
  inquirer.prompt(question).then(async ({deleteT}) => {
    switch (deleteT) {
      case 'Employee':
        queryData = await viewMySql.viewAllEmployees();
        if (queryData.length === 0) {
          console.log('There are no employees to delete');
          return main();
        }
        tableHead = ['ID','First Name','Last Name','Role ID','Manager ID']
        console.table(tableHead, queryData);
        return delEmp();

      case 'Role':
        queryData = await viewMySql.viewAllRoles();
        if (queryData.length === 0) {
          console.log('There are no roles to delete');
          return main();
        }
        tableHead = ['ID','Title','Salary','Department ID']
        console.table(tableHead, queryData);
        return delRole();

      case 'Department':
        queryData = await viewMySql.viewAllDepartments();
        if (queryData.length === 0) {
          console.log('There are no departments to delete');
          return main();
        }
        tableHead = ['ID','Dept Name'];
        console.table(tableHead, queryData);
        return delDept();
    }
  })
}

function delEmp() {
  let question = 
  [
    {
      type: 'input',
      name: 'id',
      message: "What is the id of the employee you'd like to delete?"
    }
  ]
  inquirer.prompt(question).then(async ({id}) => {
    let mySqlRes = await deleteMySql.deleteEmp(id);
    console.log(mySqlRes);
    return main();
  })
}

function delRole() {
  let question = 
  [
    {
      type: 'input',
      name: 'id',
      message: "What is the id of the role you'd like to delete?"
    }
  ]
  inquirer.prompt(question).then(async ({id}) => {
    let mySqlRes = await deleteMySql.deleteRole(id);
    console.log(mySqlRes);
    return main();
  })
}

function delDept() {
  let question = 
  [
    {
      type: 'input',
      name: 'id',
      message: "What is the id of the department you'd like to delete?"
    }
  ]
  inquirer.prompt(question).then(async ({id}) => {
    let mySqlRes = await deleteMySql.deleteDept(id);
    console.log(mySqlRes);
    return main();
  })
}

main();

