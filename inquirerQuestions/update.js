// questions for specifics related to updating emp role and emp manager
const inquirer = require('inquirer');

function empRoleQs() {
  let question = 
  [
    {
      type: 'input',
      name: 'id',
      message: "What is the id of the employee you'd like to update?"
    },
    {
      type: 'input',
      name: 'role_id',
      message: "What would you like this employee's new role to be?"
    }
  ]
  return inquirer
    .prompt(question)
    .then(answer => {
      return answer;
    })
}

function empMgrQs() {
  let question = 
  [
    {
      type: 'input',
      name: 'id',
      message: "What is the id of the employee you'd like to update?"
    },
    {
      type: 'input',
      name: 'manager_id',
      message: "Who is this employee's new manager?"
    }
  ]
  return inquirer
    .prompt(question)
    .then(answer => {
      return answer;
    })
}

module.exports = {empRoleQs, empMgrQs}