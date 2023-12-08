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
                    
                case 'Update an employee role':
                    updateEmployee();
                    break;

                case 'Exit':
                    db.end();
                    console.log('Goodbye!');
                    break;
            }
        });
}

function viewAllDepartments(){
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
      });
}

function viewAllRoles(){
    db.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
      });
}

function viewAllEmployees(){
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
      });
}

function addDepartment(){
    inquirer
    .prompt([
      {
        name: 'dep_name',
        type: 'input',
        message: "Enter new department name:"
      }
    ])
    .then((answers) => {
      db.query(
        'INSERT INTO department SET ?',
        {
          dep_name: answers.dep_name,
        },
        (err, res) => {
          if (err) throw err;
          console.log('Department added successfully!');
          start();
        }
      );
    });
}

function addRole(){
    inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: "Enter new role name:"
      },
      {
        name: 'salary',
        type: 'number',
        message: 'Enter salary of role:'
      },
      {
        name: 'department_id',
        type: 'number',
        message: 'Enter department id of new role'
      }
    ])
    .then((answers) => {
      db.query(
        'INSERT INTO roles SET ?',
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.department_id
        },
        (err, res) => {
          if (err) throw err;
          console.log('Role added successfully!');
          start();
        }
      );
    });
}

function addEmployee(){
    inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "Enter employee's first name:"
      },
      {
        name: 'last_name',
        type: 'input',
        message: "Enter employee's last name:"
      },
      {
        name: 'role_id',
        type: 'number',
        message: "Enter employee's role ID:"
      },
      {
        name: 'manager_id',
        type: 'number',
        message: "Enter employee's manager ID:"
      },
    ])
    .then((answers) => {
      db.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager_id,
        },
        (err, res) => {
          if (err) throw err;
          console.log('Employee added successfully!');
          start();
        }
      );
    });

}

function updateEmployee(){
    inquirer
    .prompt([
      {
        name: 'employee_id',
        type: 'number',
        message: "Enter the ID of the employee whose role you want to update:"
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter the new role_id for the employee:',
      },
    ])
    .then((answers) => {
      db.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [answers.role_id, answers.employee_id],
        (err, res) => {
          if (err) throw err;

          if (res.affectedRows > 0) {
            console.log('Employee role updated successfully!');
          } else {
            console.log('Employee not found with the given ID.');
          }

          start();
        }
      );
    });
}

start();


