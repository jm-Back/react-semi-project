import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    TimeScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import "./GoldPriceChart.css"

import buyImg from "../assets/gold_image.png";
import sellImg from "../assets/gold_image_gray.png";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    TimeScale,
    Tooltip,
    Legend
);

// 3️⃣ 이미지 밖으로 빼기 (안으로 넣으면 호버할 때 마다 다시 그려서 느림;;)
const buyStamp = new Image();
buyStamp.src = buyImg;
buyStamp.width = 30;
buyStamp.height = 24;

const sellStamp = new Image();
sellStamp.src = sellImg;
sellStamp.width = 30;
sellStamp.height = 24;

export default function GoldPriceChart({ }) {
    /**
     * priceData 예시
     * [
     *   { x: "2026-01-01", y: 82000 },
     *   { x: "2026-01-02", y: 83000 },
     * ]
     *
     * transactions 예시
     * [
     *   { date: "2026-01-02", type: "BUY", status: "VALID" },
     *   { date: "2026-01-03", type: "SELL", status: "VALID" }
     * ]
     */
    const priceData = [
        { x: "2026-01-01", y: 82000 },
        { x: "2026-01-02", y: 82300 },
        { x: "2026-01-03", y: 82500 },
        { x: "2026-01-04", y: 82200 },
        { x: "2026-01-05", y: 82800 },
        { x: "2026-01-06", y: 83000 },
        { x: "2026-01-07", y: 83200 },
        { x: "2026-01-08", y: 83500 },
        { x: "2026-01-09", y: 83300 },
        { x: "2026-01-10", y: 83800 },

        { x: "2026-01-11", y: 84000 },
        { x: "2026-01-12", y: 84200 },
        { x: "2026-01-13", y: 83900 },
        { x: "2026-01-14", y: 84500 },
        { x: "2026-01-15", y: 84800 },
        { x: "2026-01-16", y: 84600 },
        { x: "2026-01-17", y: 85000 },
        { x: "2026-01-18", y: 85200 },
        { x: "2026-01-19", y: 85500 },
        { x: "2026-01-20", y: 85300 },

        { x: "2026-01-21", y: 85700 },
        { x: "2026-01-22", y: 86000 },
        { x: "2026-01-23", y: 85800 },
        { x: "2026-01-24", y: 86200 },
        { x: "2026-01-25", y: 86500 },
        { x: "2026-01-26", y: 86800 },
        { x: "2026-01-27", y: 86600 },
        { x: "2026-01-28", y: 87000 },
        { x: "2026-01-29", y: 87300 },
        { x: "2026-01-30", y: 87500 },
    ];

    const transactions = [
        {
            id: 1,
            date: "2026-01-02",
            type: "BUY",
            quantity: 10,
            price: 82300,
            status: "VALID",
        },
        {
            id: 2,
            date: "2026-01-05",
            type: "BUY",
            quantity: 5,
            price: 82800,
            status: "VALID",
        },
        {
            id: 3,
            date: "2026-01-07",
            type: "SELL",
            quantity: 8,
            price: 83200,
            status: "VALID",
        },
        {
            id: 4,
            date: "2026-01-12",
            type: "BUY",
            quantity: 7,
            price: 84200,
            status: "VALID",
        },
        {
            id: 5,
            date: "2026-01-15",
            type: "SELL",
            quantity: 6,
            price: 84800,
            status: "VALID",
        },
        {
            id: 6,
            date: "2026-01-20",
            type: "BUY",
            quantity: 4,
            price: 85300,
            status: "VALID",
        },
        {
            id: 7,
            date: "2026-01-25",
            type: "SELL",
            quantity: 5,
            price: 86500,
            status: "VALID",
        },
    ];

    // 1️⃣ 날짜 → 시세 매핑
    const priceMap = Object.fromEntries(
        priceData.map(p => [p.x, p.y])
    );

    // 2️⃣ 스탬프용 데이터 생성 (선 위 y값!)
    const stampData = transactions
        .filter(tx => tx.status === "VALID")
        .map(tx => ({
            x: tx.date,
            y: priceMap[tx.date],
            type: tx.type,
            pointStyle: tx.type === "BUY" ? buyStamp : sellStamp,
        }))
        .filter(p => p.y !== undefined);

    // 4️⃣ 차트 데이터
    const data = {
        datasets: [
            {
                type: "line",
                events: [],
                label: "금 시세",
                data: priceData,
                borderColor: "#f4c430",
                borderWidth: 3,
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 0,   // ⭐ 핵심
                pointHitRadius: 0,     // ⭐ 핵심

            },
            {
                type: "scatter",
                data: stampData,
                pointStyle: ctx => ctx.raw.pointStyle, // 가벼움
                pointRadius: 12,
                pointHoverRadius: 14,
                hitRadius: 10,
            },
        ],
    };

    // 5️⃣ 옵션
    const options = {
        responsive: true,
        interaction: {
            mode: "nearest",
            intersect: true,
        },
        plugins: {
            datalabels: {
                display: false,
            },
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                filter: ctx => ctx.dataset.type === "scatter",
                callbacks: {
                    title: ctx => ctx[0].raw.x,
                    label: ctx => {
                        const { type, y } = ctx.raw;
                        return type === "BUY"
                            ? `매입 @ ${y.toLocaleString()}원`
                            : `매도 @ ${y.toLocaleString()}원`;
                    },
                },
            },
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    tooltipFormat: "yyyy-MM-dd",
                },
            },
            y: {
                ticks: {
                    stepSize: 3000, //간격
                    callback: value => value.toLocaleString() + "원",
                },
            },
        },
    };


    return (
        <div className="gold-chart-container">
            <div className="gold-chart-header">
                <div className="gold-chart-title">금 시세 추이</div>
                <div className="gold-chart-subtitle">
                    지난 1년간 매입 · 매도 기록이 시세에 표시됩니다
                </div>
            </div>

            <div className="gold-chart-body">
                <Chart data={data} options={options} />
            </div>

            <div className="gold-chart-footer">
                <div className="chart-legend">
                    <div className="legend-item">
                        <span className="legend-dot legend-buy" />
                        매입
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot legend-sell" />
                        매도
                    </div>
                </div>
            </div>
        </div>
    );

}
