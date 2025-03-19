require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "tu_usuario",
  host: "localhost",
  database: "tu_base_de_datos",
  password: "tu_contraseña",
  port: 5432,
});

// Obtener todos los KPIs
app.get("/api/kpis", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM kpis ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener KPIs" });
  }
});

// Agregar un nuevo KPI
app.post("/api/kpis", async (req, res) => {
  const { name, value } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO kpis (name, value) VALUES ($1, $2) RETURNING *",
      [name, value]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar KPI" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
