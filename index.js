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
        choices: [""]
})
}