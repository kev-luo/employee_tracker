# employee_tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub top language](https://img.shields.io/github/languages/top/kev-luo/employee_tracker)

## Description
content management system (cms) allowing companies to keep track of their employees

**pseudocoding:**
- ~~create databases and tables~~
- ~~use inquirer to allow user to add departments, roles, and employees~~
- ~~use inquirer to allow user to view departments, roles, and employees~~
- ~~use inquirer to allow user to update employee roles~~
- ~~allow updating employee managers~~
- allow viewing employees by manager
- ~~allow deleting departments, roles, and employees~~
- allow viewing of total utilized budget of a department (combined salaries of all employees in that department)
- fix transitions between different types of queries
- when asking about new employee, make theh role question a list of choices based on what's shown in the employee table

**look into:**
- separate files for containing functions for performing specific sql queries i plan to use
- constructor function/class for organizing sql queries
- seed.sql file to pre-populate database
- adding validation to ensure user enters numbers when appropriate
- self referential tables?

**issues run into**
- connecting modules and having them all work together in one file
- async/await with inquirer 
- query mySQL using variable containing table name as a string (eg INSERT INTO ? SET ?). first question mark is where i want to put the table name variable however it's not working since the variable contains a string. 
  -  error: "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''employee'' at line 1"
-  cli-table doesn't end the inquirer if i don't explicitly call another inquirer function
- insert new entry into role table with 'insert ... select' query

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

## Installation
    npm install

## Usage
CLI

## License
Licensed under the [MIT](https://opensource.org/licenses/MIT) License.

## Contributing
clone and then commit to your own branch

## Tests
    npm run test


## Questions
![github profile pic](https://github.com/kev-luo.png?size=100)
* [kvn.luo@gmail.com](kvn.luo@gmail.com)