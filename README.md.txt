# Employee Management System

A simple **Node.js + Express + MySQL** backend for managing employee data.  
Supports **CRUD operations** (Create, Read, Update, Delete) and **search functionality**.

---

## 💻 Features

- Add new employees (POST /add-employee)
- View all employees (GET /employees)
- View single employee by ID (GET /employee/:id)
- Update employee details (PUT /employee/:id)
- Delete employee (DELETE /employee/:id) ✅ Supports soft delete via `is_deleted` column
- Search employees by name or department (GET /search?name=John&department=IT)

---

## ⚙️ Technologies Used

- **Node.js**: Backend runtime  
- **Express.js**: Web framework  
- **MySQL**: Relational database  
- **Body-parser**: Parse JSON requests  
- **Postman**: API testing (alternative: Thunder Client, curl, HTTPie)

---

## 🛠 Database Setup

1. Open MySQL/MariaDB and create database:

```sql
CREATE DATABASE employee_db;

2. Create employees table:

CREATE TABLE employees (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    department VARCHAR(50),
    salary DECIMAL(10,2),
    date_joined DATE
);