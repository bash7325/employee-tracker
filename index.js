const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table")


//MYSQL CREATE CONNECTION
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Lngbrds9!',
    database: '',
});

//CONNECT TO MYSQL THEN START
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    start();
});

function start() {

    inquirer.prompt({
        name:"startQuestions",
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
