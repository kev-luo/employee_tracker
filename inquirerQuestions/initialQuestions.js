const inquirer = require('inquirer');

function whatNext() {
    let question = {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View','Add','Update','Remove','Exit']
    }
    
    return inquirer.prompt(question)
}

function viewDb() {
  let question = {
    type: 'list',
    name: 'view',
    message: 'What would you like to view?',
    choices: ['All employees','All roles','All departments','All employees by department', 'All employees by manager','Go Back']
  }
  return inquirer.prompt(question)
}

function addToDb() {
  let question = {
    type: 'list',
    name: 'add',
    message: 'What would you like to add?',
    choices: ['New employee','New role','New department','Go Back']
  }
  return inquirer.prompt(question)
}

function updateDb() {
  let question = {
    type: 'list',
    name: 'update',
    message: 'What would you like to update?',
    choices: ['Employee role', 'Employee manager', 'Go Back']
  }
  return inquirer.prompt(question)
}

module.exports = {whatNext, viewDb, addToDb, updateDb};
