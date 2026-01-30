import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "./GoldBarChart.css"
import { chartColorList } from "../util/chart-color"

import NoData from "./common/NoData";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    ChartDataLabels
);


function AssetLegend({ datasets }) {
    return (
        <div className="asset-legend">
            {datasets.map((ds) => (
                <div key={ds.label} className="legend-item">
                    <span
                        className="legend-color"
                        style={{ backgroundColor: ds.backgroundColor }}
                    />
                    <span className="legend-label">{ds.label}</span>
                </div>
            ))}
        </div>
    );
}


export default function DoughnutChart() {

    const data = {
        labels: ['자산 비율'],
        datasets: [
            {
                label: '콩알금',
                data: [1000],
                backgroundColor: chartColorList[0],
                animation: {
                    duration: 600,
                    easing: 'easeOutQuart',
                },
                stack: 'asset',

                borderRadius: {
                    topLeft: 8,
                    bottomLeft: 8,
                },

                // ⭐ 여기!
                barPercentage: 1.0,
                categoryPercentage: 1.0,
            },
            {
                label: '골드바',
                data: [2000],
                backgroundColor: chartColorList[1],
                animation: {
                    duration: 600,
                    easing: 'easeOutQuart',
                },
                stack: 'asset',

                // ⭐ 여기!
                barPercentage: 1.0,
                categoryPercentage: 1.0,
            },
            {
                label: '귀금속',
                data: [3000],
                backgroundColor: chartColorList[2],
                animation: {
                    duration: 600,
                    easing: 'easeOutQuart',
                },
                stack: 'asset',
                // ⭐ 여기!
                barPercentage: 1.0,
                categoryPercentage: 1.0,
            },
        ],
    };

    //차트 옵션 
    const options = {
        indexAxis: 'y', // 🔥 가로
        responsive: true,
        maintainAspectRatio: false, // ⭐ 핵심

        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (ctx) =>
                        `${ctx.dataset.label}: ${ctx.parsed.x.toLocaleString()}원`,

                },
            },
            datalabels: {
                font: {
                    family: "MemomentKkukkukk",
                    size: 17,
                },
                color: "#fff",
                formatter: (value) => value.toLocaleString(),
            }
            ,
        },
        scales: {
            x: {
                stacked: true,
                display: false, // 깔끔
                ticks: {
                    font: {
                        family: "MemomentKkukkukk",
                        size: 12,
                    },
                    callback: (value) => value.toLocaleString(), // ⭐ 콤마
                },
            },
            y: {
                stacked: true,
                display: false,
            },
        },
    };

    return (
        <div className='chart-wrapper'>
            {data.datasets.length === 0 ? (
                <NoData message="거래 기록이 없습니다" />
            ) : (
                <>
                    <Bar data={data} options={options} />
                    <AssetLegend datasets={data.datasets} />
                </>
            )}
        </div>
    );


}
