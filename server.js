const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vengat123",
  database: "employee_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL database!");
});


app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.post("/add-employee", (req, res) => {
  const { first_name, last_name, email, department, salary, date_joined } = req.body;
  const sql = "INSERT INTO employees (first_name, last_name, email, department, salary, date_joined) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [first_name, last_name, email, department, salary, date_joined], (err, result) => {
    if (err) throw err;
    res.json({ message: "Employee added successfully!", emp_id: result.insertId });
  });
});


app.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM employees WHERE emp_id = ?", [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});


app.put("/employee/:id", (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email, department, salary } = req.body;
  const sql = "UPDATE employees SET first_name=?, last_name=?, email=?, department=?, salary=? WHERE emp_id=?";
  db.query(sql, [first_name, last_name, email, department, salary, id], (err) => {
    if (err) throw err;
    res.json({ message: "Employee updated successfully!" });
  });
});


app.delete("/employee/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE emp_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Employee deleted successfully!" });
  });
});


app.get("/search", (req, res) => {
  const { name, department } = req.query;
  let sql = "SELECT * FROM employees WHERE 1=1";
  const params = [];

  if (name) {
    sql += " AND (first_name LIKE ? OR last_name LIKE ?)";
    params.push(`%${name}%`, `%${name}%`);
  }
  if (department) {
    sql += " AND department LIKE ?";
    params.push(`%${department}%`);
  }

  db.query(sql, params, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
