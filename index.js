const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//MYSQL CONNECTION
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Lngbrds9!",
  database: "employee_tracker",
});

//CONNECT TO MYSQL THEN START
connection.connect(function (err) {
  if (err) throw err;
  start();
});

//START INQUIRER PROMPTS
function start() {
  inquirer
    .prompt({
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Role",
        "View Employee",
        "Update Employee Role",
        "Exit",
      ],
    })

    .then(function (result) {
      switch (result.option) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View Department":
          viewDepartment();
          break;
        case "View Role":
          viewRole();
          break;
        case "View Employee":
          viewEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

//ADD DEPARTMENT FUNCTION
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What department would you like to add?",
      name: "department",
    })
    .then(function (res) {
      const department = res.department;
      connection.query(
        `INSERT INTO department (name) VALUES("${department}")`,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
}

//ADD ROLE FUNCTION
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the job title you want to add?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the department ID for this position?",
        name: "departmentID",
      },
    ])
    .then(function (res) {
      const title = res.title;
      const departmentID = res.departmentID;
      connection.query(
        `INSERT INTO role (title, department_id) VALUE("${title}", "${departmentID}")`,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
}

//ADD EMPLOYEE FUNCTION
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the last name?",
        name: "lastName",
      },
      {
        type: "input",
        message: "What is the role ID?",
        name: "roleID",
      },
      {
        type: "input",
        message: "What is the manager ID?",
        name: "managerID",
      },
    ])
    .then(function (res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const roleID = res.roleID;
      const managerID = res.managerID;
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
}

//VIEW EMPLOYEE FUNCTION
function viewEmployee() {
  connection.query(
    "SELECT first_name, last_name, role_id, manager_id FROM employee",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}

//VIEW DEPARTMENT FUNCTION
function viewDepartment() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

//VIEW ROLE FUNCTION
function viewRole() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

//UPDATE ROLE FUNCTION
function updateRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate"
      },

      {
        type: "input",
        message: "What role ID would you like to update to?",
        name: "updateRole"
      }
    ])
    .then(function(answer) {
      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.employeeUpdate], (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
}
