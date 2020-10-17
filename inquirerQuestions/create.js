const inquirer = require('inquirer');

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
  return inquirer
    .prompt(question)
    .then(employee => {
      return employee;
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
  return inquirer
    .prompt(question)
    .then(role => {
      return role;
    })
}

function addDept() {
  let question = {
    type: 'input',
    name: 'name',
    message: "What is the name of the new department?"
  }
  return inquirer
    .prompt(question)
    .then(dept => {
      return dept;
    })
}

module.exports = {addEmployee,addRole,addDept}