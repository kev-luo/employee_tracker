const inquirer = require('inquirer');
const Table = require('cli-table');
const mysql = require('mysql');
const initialQuestions = require('./inquirerQuestions/whatNext');
const {department,employee,role} = require('./inquirerQuestions/tableClasses');

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

initialQuestions.whatNext();

// switch case here based on initial question response
// call table classes with add/delete/read/update inquirer response
// make mysql query using newly created object