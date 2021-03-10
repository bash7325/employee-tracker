USE department;

INSERT INTO role (id)
VALUES ("?");

INSERT INTO role (department_name)
VALUES ("Test Department");

USE role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Jones", 1, 1);