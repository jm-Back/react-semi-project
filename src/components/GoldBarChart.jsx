import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { chartColorList } from "../util/chart-color"
import "./GoldBarChart.css"

import { useState, useEffect, useContext } from "react";
import { AssetRefreshContext } from "../context/AssetRefreshContext";

import NoData from "./common/NoData";
//백엔드 통신 
import { getCategoryData } from "../api/assetApi"


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
    const { assetVersion } = useContext(AssetRefreshContext);

    const [categoryValues, setCategoryValues] = useState([]);

    useEffect(() => {
        getCategoryData()
            .then(res => setCategoryValues(res.data))       //카테고리 개별 조회 
            .catch(console.error);
    }, [assetVersion]);

    const data = {
        labels: ['자산 비율'],
        datasets: categoryValues.map((item, idx) => ({
            label: item.name,
            data: [item.tradeAmount],
            gram: item.gram,            // ⭐ 여기 추가
            backgroundColor: chartColorList[idx % chartColorList.length],
            stack: 'asset',

            animation: {
                duration: 600,
                easing: 'easeOutQuart',
            },

            barPercentage: 1.0,
            categoryPercentage: 1.0,

            borderRadius:
                idx === 0
                    ? { topLeft: 8, bottomLeft: 8 }
                    : idx === categoryValues.length - 1
                        ? { topRight: 8, bottomRight: 8 }
                        : 0,
        }))
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
                    label: (ctx) => {
                        const { gram } = ctx.dataset;
                        const amount = ctx.raw;

                        return [
                            `${gram}g`,
                            `매입금액 ${amount.toLocaleString()}원`,
                        ];
                    },
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
