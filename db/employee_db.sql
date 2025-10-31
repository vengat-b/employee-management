CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE employees (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    department VARCHAR(50),
    salary DECIMAL(10,2),
    date_joined DATE
);

INSERT INTO employees (first_name, last_name, email, department, salary, date_joined)
VALUES
('John', 'Doe', 'john.doe@example.com', 'IT', 60000.00, '2022-05-10'),
('Jane', 'Smith', 'jane.smith@example.com', 'HR', 55000.00, '2023-01-15'),
('David', 'Lee', 'david.lee@example.com', 'Finance', 70000.00, '2021-11-01');

SELECT * FROM employees WHERE email IS NULL OR email = '';

SELECT email, COUNT(*) 
FROM employees 
GROUP BY email 
HAVING COUNT(*) > 1;

SELECT * FROM employees WHERE salary < 0;

SELECT * FROM employees WHERE date_joined > '2023-01-01';
