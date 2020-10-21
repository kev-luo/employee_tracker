# Employee Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub top language](https://img.shields.io/github/languages/top/kev-luo/employee_tracker)

## Description
This is a rudimentary content management system (cms) that allows companies to keep track of their their company structure. MySQL was used to store the data on a local server, which the user can retrieve/manipulate through Inquirer. The biggest challenge in getting this app to work was figuring out MySQL's syntax and orders of operation. Specifically, in trying to update manager ID's in the employee's table while also referencing employee's table in the same string led down a rabbit hole of subqueries, derived tables, and foreign key constraints. Working out the precedence of MySQL was critical to figuring out how to create more complex queries. Besides MySQL, the only other area that took some extra time was working around the asynchronous behavior of the queries combined with storing them in separate modules from the inquirer questions. I used promises in the query functions themselves, and then async/await in the inquirer functions to get the app working smoothly.

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Questions](#questions)

## Installation
    npm install

## Usage

Run the app using the command below and you will be presented with some questions to help you get started with you employee management system. You can exit the application at any time by pressing Ctrl + C.

    node app.js

![demo](assets/demo.gif)

## License
Licensed under the [MIT](https://opensource.org/licenses/MIT) License.


## Questions

* [kvn.luo@gmail.com](kvn.luo@gmail.com)