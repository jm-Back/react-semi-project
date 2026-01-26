import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "./GoldChart.css"
import { chartColorList } from "../util/chart-color"

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
            {
                label: 'KRX금현물',
                data: [4000],
                backgroundColor: chartColorList[3],
                animation: {
                    duration: 600,
                    easing: 'easeOutQuart',
                },
                stack: 'asset',

                borderRadius: {
                    topRight: 8,
                    bottomRight: 8,
                },

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


    // const textCenter = {
    //     id: 'textCenter',
    //     afterDatasetsDraw: (chart) => {
    //         const ctx = chart.ctx;
    //         const x = (chart.chartArea.left + chart.chartArea.right) / 2;
    //         const y = (chart.chartArea.top + chart.chartArea.bottom) / 2;

    //         //총합 
    //         const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);

    //         // ✅ 전월 대비 증감 (예시)
    //         const prevTotal = chart.options.prevTotal ?? 0;
    //         const diff = total - prevTotal;
    //         const isUp = diff >= 0;

    //         ctx.save();
    //         ctx.font = 'bold 20px MemomentKkukkukk';
    //         ctx.textAlign = 'center';

    //         ctx.textBaseline = 'middle';
    //         ctx.fillText(`${total.toLocaleString()}원`, x, y - 8);

    //         // 🔹 2줄: 전월 대비
    //         ctx.font = "12px MemomentKkukkukk";
    //         ctx.fillStyle = isUp ? "#ff4d4f" : "#1890ff";

    //         const sign = isUp ? "🔺" : "🔻";
    //         ctx.fillText(
    //             `전월대비 ${sign}${Math.abs(diff).toLocaleString()}원`,
    //             x,
    //             y + 14
    //         );

    //         ctx.restore();

    //     },
    // };

    return <div className='chart-wrapper'>
        <Bar data={data} options={options} />
        <AssetLegend datasets={data.datasets} />
    </div>

}
