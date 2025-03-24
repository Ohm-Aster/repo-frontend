import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "RAILWAY_PRIVATE_DOMAIN",
  database: "railway",
  password: "rayuQGxRlJaWXNmmxVDMIuOcQTTCaikR",
  port: 5432,
});

// Obtener KPIs
app.get("/api/kpis", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM kpis ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener KPIs" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
