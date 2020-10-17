const inquirer = require("inquirer")

function whatNext() {
  let question = {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do next?',
    choices: ['View','Add','Update','Remove','Exit']
  }
  inquirer
    .prompt(question)
    .then(answer => {
      switch (answer.choice) {
        case 'View':
          return viewDb();
        case 'Add':
          return addToDb();
        case 'Update':
          return updateDb();
        case 'Remove':
          console.log('coming soon');
        default:
          console.log('Lates');
      }
  })
}

function viewDb() {
  let question = {
    type: 'list',
    name: 'view',
    message: 'What would you like to view?',
    choices: ['All employees','All roles','All departments','Go Back']
  }
  inquirer
  .prompt(question)
  .then(answer => {
    switch (answer.view) {
      case 'All employees':
        break;
      case 'All roles':
        break;
      case 'All departments':
        break;
      default:
        whatNext();
    }
  })
}

function addToDb() {
  let question = {
    type: 'list',
    name: 'add',
    message: 'What would you like to add?',
    choices: ['New employee','New role','New department','Go Back']
  }
  inquirer
  .prompt(question)
  .then(answer => {
    switch (answer.add) {
      case 'New employee':
        break;
      case 'New role':
        break;
      case 'New department':
        break;
      default:
        whatNext();
    }
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
  inquirer
  .prompt(question)
  .then(answer => {
    switch (answer.update) {
      case 'Employee role':
        break;
      default:
        whatNext();
    }
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