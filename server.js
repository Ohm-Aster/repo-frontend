require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

app.get("/kpis", async (req, res) => {
    const result = await pool.query("SELECT * FROM kpis");
    res.json(result.rows);
});

app.post("/kpis", async (req, res) => {
    const { name, value } = req.body;
    await pool.query("INSERT INTO kpis (name, value) VALUES ($1, $2)", [name, value]);
    res.json({ message: "KPI agregado" });
});

app.listen(3001, () => console.log("Servidor en puerto 3001"));


