const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table")


//MYSQL CREATE CONNECTION
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Lngbrds9!',
    database: 'employee_tracker',
});

//CONNECT TO MYSQL THEN START
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    start();
});

function start() {

    inquirer.prompt({
        name:"action",
        type: "list",
        message: "What would you like to do?",
        choices: ['View All Employees',
        'View Employees By Department',
        'View Employees By Manager',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager',]
})
.then((answer) => {
    switch (answer.action) {
        case 'View All Employees':
            allEmployeeSearch();
            break;
        
        case 'View Employees By Department':
            allEmployeesByDepartment();
            break;

        case 'View Employees By Manager':
            allEmployeesByManager();
            break;
        
        case 'Add Employee':
            addEmployee();
            break;

        case 'Remove Employee':
            removeEmployee();
            break;

        case 'Update Employee Role':
            updateEmployeeRole();
            break;

        case 'Update Employee Manager':
            updateEmployeeManager();
            break;

        default:
            console.log(`Invalid action: ${answer.action}`);
            break;
    }
});
};

const allEmployeeSearch = () => {
    console.log("test")
    connection.query('SELECT first_name, last_name FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        });
        
  };

  const addEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'New Employee First Name:',
            validate: answer => {
                if (answer !== "") {
                    return true
                };
                return "must enter a name"
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'New Employee Last Name:',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'New Employee Role Id (if applicable):',
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'New Employees Manager Id (if applicable)',
        }
    ]).then((answer) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${answer.firstName}, ${answer.lastName}, ${answer.roleId}, ${answer.managerId})`;
        connection.query(query, (err, res) => {
            console.log("New Employee Added!");
        });
    });
}
