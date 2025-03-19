import { useState, useEffect } from "react";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://tu-api-railway.com/kpis") // Reemplaza con la URL de tu API
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>📊 Dashboard de KPIs</h1>
            <ul>
                {data.map((kpi) => (
                    <li key={kpi.id}>
                        {kpi.name}: {kpi.value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
