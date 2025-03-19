import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function Dashboard() {
    const [kpis, setKpis] = useState([]);

    useEffect(() => {
        axios.get("https://tu-backend-railway.app/kpis")
            .then(res => setKpis(res.data));
    }, []);

    return (
        <div>
            <h1>Dashboard de KPIs</h1>
            <Line data={{
                labels: kpis.map(kpi => kpi.name),
                datasets: [{
                    label: "KPIs",
                    data: kpis.map(kpi => kpi.value),
                    borderColor: "blue"
                }]
            }} />
        </div>
    );
}

export default Dashboard;
