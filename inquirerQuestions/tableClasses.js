const Department = function(name) {
  this.name = name;
}

const Employee = function(first_name,last_name,role_id,manager_id) {
  this.first_name = first_name
  this.last_name = last_name
  this.role_id = role_id
  this.manager_id = null;
}

const Role = function(title,salary,department_id) {
  this.title = title;
  this.salary = salary;
  this.department_id = department_id;
}

module.exports = {Department,Employee,Role}
