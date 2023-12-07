INSERT INTO department (dep_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES -- SALES
       ("Sales Lead", 80000, 1),
       ("Salesperson", 50000, 1),
       -- ENGINEERING
       ("Lead Engineer", 120000, 2),
       ("Software Engineer", 100000, 2),
       -- LEGAL
       ("Legal Team Lead", 150000, 3),
       ("Lawyer", 125000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Mary", "Miller", 2, 1),
       -- John Doe is the Sales Lead, Mary Miller is his employee
       ("Joe", "Schmo", 3, NULL),
       ("Ronald", "McDonald", 4, 3),
       -- Joe Schmo is the Lead Engineer and Ronald McDonald is his employee
       ("Jessica", "Rodriguez", 5, NULL),
       ("Rob", "Roe", 6, 5);
       -- Jessica Rodriguez is the Legal Team Lead and Rob Roe is her employee
       