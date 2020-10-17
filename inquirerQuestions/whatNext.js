const inquirer = require('inquirer');

function whatNext() {
  let question = {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do next?',
    choices: ['View','Add','Update','Remove','Exit']
  }
  return inquirer.prompt(question);
}

function viewDb() {
  let question = {
    type: 'list',
    name: 'view',
    message: 'What would you like to view?',
    choices: ['All employees','All roles','All departments','Go Back']
  }
  return inquirer
    .prompt(question)
    .then(answer => {
      return answer.view;
    })
}

function addToDb() {
  let question = {
    type: 'list',
    name: 'add',
    message: 'What would you like to add?',
    choices: ['New employee','New role','New department','Go Back']
  }
  return inquirer
    .prompt(question)
    .then(answer => {
      return answer.add;
    })
}

function updateDb() {
  let question = {
    type: 'list',
    name: 'update',
    message: 'What would you like to update?',
    choices: ['Employee role','Go Back']
  }
  return inquirer
    .prompt(question)
    .then(answer => {
      return answer.update;
    })
}

module.exports = {whatNext, viewDb, addToDb, updateDb};

// function deleteFromDb() {
//   let question = {
//     type: 'list',
//     name: 'delete',
//     message: 'What would you like to delete?',
//     choices: []
//   }
// }