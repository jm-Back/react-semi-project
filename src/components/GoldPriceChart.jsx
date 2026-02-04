import {
    Chart as ChartJS,
    LineElement,
    ScatterController,
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

//백엔드 통신 테스트 
import { useContext, useState, useEffect } from "react";
import { GoldTrackerStateContext } from "../App";
import { getGoldPrices } from '../api/common';
import { yearsToMonths } from "date-fns";

import { findNearestPrice } from "../util/find-nearest-price";

ChartJS.register(
    LineElement,
    ScatterController,
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


function toDateString(ms) {
    return new Date(ms).toISOString().slice(0, 10);
}

export default function GoldPriceChart({ }) {

    const transactions = useContext(GoldTrackerStateContext)
    const [goldPrices, setGoldPrices] = useState([]);

    useEffect(() => {
        getGoldPrices()
            .then(res => setGoldPrices(res.data))
            .catch(console.error);
    }, []);

    const linePriceData = goldPrices.map(p => ({
        x: p.date,
        y: p.buyPrice375g,
    }));

    //goldPrices
    // 1️⃣ 날짜 → 시세 매핑
    const priceMap = Object.fromEntries(
        linePriceData.map(p => [p.x, p.y])
    );

    // 2️⃣ 스탬프용 데이터 생성 (선 위 y값!)
    const stampData = transactions
        .map(tx => {
            const dateStr = toDateString(tx.tradeDate);
            const y = priceMap[dateStr] ?? findNearestPrice(dateStr, priceMap);   //주말 시세 없는 데이터는 알아서

            if (y === undefined) return null;

            return {
                x: dateStr,
                y,
                type: tx.tradeType,
                pointStyle: tx.tradeType === "BUY" ? buyStamp : sellStamp,
                gram: tx.gram,
                unitPrice: tx.unitPrice,
            };
        })
        .filter(Boolean);

    // 4️⃣ 차트 데이터
    const data = {
        datasets: [
            {
                type: "line",
                events: [],
                label: "금 시세",
                data: linePriceData,
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
                pointStyle: ctx => {
                    if (!ctx.raw) return undefined;
                    return ctx.raw.pointStyle;
                },
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
                        const tx = ctx.raw;
                        return [
                            tx.type === "BUY" ? "매입" : "매도",
                            `${tx.gram}g`,
                            `단가 ${tx.unitPrice.toLocaleString()}원`
                        ];
                    }
                },
            },
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "month",
                    tooltipFormat: "yyyy-MM-dd",
                    displayFormats: {
                        month: "yyyy.MM",   // ← 핵심
                    },
                },
                ticks: {
                    callback: (value, index, ticks) => {
                        const date = new Date(ticks[index].value);
                        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}`;
                    },
                },
            },
            y: {
                ticks: {
                    stepSize: 5000, //간격
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
