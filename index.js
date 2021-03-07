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