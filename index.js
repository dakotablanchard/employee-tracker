// Import Inquirer and MySQL
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create SQL connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root32',
        database: 'employees_db'
    },
    console.log(`EMPLOYEE MANAGER`)


);

// Main menu function
function start() {
    inquirer
        .prompt({
            name: 'menu',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments',
                      'View all roles',
                      'View all employees',
                      'Add a department',
                      'Add a role',
                      'Add an employee',
                      'Update an employee role',
                      'Exit'],
        })
        .then((answer) => {
            switch (answer.menu) {
                case 'View all departments':
                    viewAllDepartments();
                    break;

                case 'View all roles':
                    viewAllRoles();
                    break;

                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Exit':
                    db.end();
                    console.log('Goodbye!');
                    break;
            }
        });
}

start();
