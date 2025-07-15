const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// SQL Server connection config
const config = {
  user: "sa",
  password: "dts@123",
  server: "DCCPL0668", // like 'localhost' or '192.168.1.100'
  database: "CRUD",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// GET tasks
app.get("/UserDetails", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM UserDetails`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST task
app.post("/UserDetails", async (req, res) => {
  try {
    const { title, isComplete } = req.body;
    await sql.connect(config);
    await sql.query`INSERT INTO UserDetails (Id,Name,EmailId) VALUES (${id}, ${name}, ${emailId})`;
    res.send("Task added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT task
app.put("/UserDetails/:id", async (req, res) => {
  try {
    const { title, isComplete } = req.body;
    const { id } = req.params;
    await sql.connect(config);
    await sql.query`UPDATE UserDetails SET Name = ${name}, EmailId = ${emailId} WHERE Id = ${id}`;
    res.send("Task updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE task
app.delete("/UserDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await sql.connect(config);
    await sql.query`DELETE FROM UserDetails WHERE Id = ${id}`;
    res.send("Task deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/", (req, res) => {
  res.send("API is running");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
