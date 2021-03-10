const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//MYSQL CREATE CONNECTION
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Lngbrds9!",
  database: "employee_tracker",
});

//CONNECT TO MYSQL THEN START
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
});
//START INQUIRER PROMPTS
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View Employees By Department",
        "View Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          allEmployeeSearch();
          break;

        case "View Employees By Department":
          allEmployeesByDepartment();
          break;

        case "View Employees By Manager":
          allEmployeesByManager();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Update Employee Manager":
          updateEmployeeManager();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
}
//EMPLOYEE SEARCH FUNCTION
const allEmployeeSearch = () => {
  console.log("test");
  connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};
//ADD NEW EMPLOYEE FUNCTION
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "New Employee First Name:",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "must enter a name";
        },
      },
      {
        name: "lastName",
        type: "input",
        message: "New Employee Last Name:",
      },
      {
        name: "roleId",
        type: "input",
        message: "New Employee Role Id:",
      },
      {
        name: "managerId",
        type: "input",
        message: "New Employees Manager Id (if applicable):",
      },
    ])
    .then((answer) => {
      if (answer.managerId == "") {
        answer.managerId = null;
      }
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
         VALUES ("${answer.firstName}", "${answer.lastName}", ${answer.roleId}, ${answer.managerId})`,
        (err, res) => {
          if (err) throw err;
          console.log("New Employee Added");
          start();
        }
      );
    });
};
