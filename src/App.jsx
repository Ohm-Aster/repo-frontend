import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchKPIs();
  }, []);

  const fetchKPIs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/kpis");
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener KPIs:", error);
    }
  };

  const addKPI = async () => {
    if (!name || !value) return alert("Completa todos los campos");
    try {
      await axios.post("http://localhost:5000/api/kpis", { name, value });
      setName("");
      setValue("");
      fetchKPIs();
    } catch (error) {
      console.error("Error al agregar KPI:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard de KPIs</h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-4xl">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-4xl mt-6">
        <h2 className="text-lg font-bold mb-2">➕ Agregar KPI</h2>
        <input
          type="text"
          placeholder="Nombre del KPI"
          className="p-2 mb-2 rounded-lg bg-gray-700 text-white w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          className="p-2 mb-2 rounded-lg bg-gray-700 text-white w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={addKPI}
          className="bg-green-500 p-2 rounded-lg w-full hover:bg-green-600"
        >
          Agregar KPI
        </button>
      </div>
    </div>
  );
}

export default App;
