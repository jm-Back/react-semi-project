import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

export default function MiniLineChart({ data, isUp }) {
    const chartData = {
        labels: data.map((_, i) => i),
        datasets: [
            {
                data,
                borderColor: isUp ? "#ff4d4f" : "#1890ff",
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // 차트 안깨지게 
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            datalabels: {
                display: false,
            },
        },
        scales: {
            x: { display: false },
            y: { display: false },
        },
        datalabels: {
            display: false, // 🔥 가격 라벨 OFF
        },
    };

    return (
        <div className="mini-chart">
            <Line data={chartData} options={options} />
        </div>

    )
}
