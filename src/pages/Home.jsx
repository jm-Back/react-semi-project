import { useState, useEffect } from "react";

import Header from "../components/Header";
import Button from "../components/common/Button";

import GoldList from "../components/GoldList";
import GoldBarChart from "../components/GoldBarChart";
import GoldTrader from "../components/GoldTrader";
import GoldAssetSummary from "../components/GoldAssetSummary";
import GoldPriceChart from "../components/GoldPriceChart";

import "./Home.css";
import { getTradeList } from "../api/tradeApi"

const Home = () => {
    const [pivotDate, setPivotDate] = useState(new Date());
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        const fetchMonthlyData = async () => {
            try {
                const res = await getTradeList({
                    year: pivotDate.getFullYear(),
                    month: pivotDate.getMonth() + 1, // 1~12
                });
                setMonthlyData(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchMonthlyData();
    }, [pivotDate]);

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    return (
        <div>
            <Header />
            <div className="top-section">
                <GoldAssetSummary
                    name="백정민"
                    holdings={[
                        { gram: 1.2, pricePerGram: 100000 },
                        { gram: 0.5, pricePerGram: 102000 },
                    ]} />
            </div>
            <div className='top-section'>
                <GoldTrader type="TOTAL_ASSET" />
                <GoldTrader type="PROFIT_LOSS" />
                <GoldTrader type="TODAY_PRICE" />
            </div>


            <div className="top-section">
                <div className="section-2">
                    <h3>🪙 금 시세 & 거래 타임라인</h3>
                    <GoldPriceChart
                    />
                </div>

            </div>

            <div className="date-selector">
                <div className="date_left"><Button onClick={onDecreaseMonth} text={"<"} /></div>
                <div className="date_center">
                    <span>
                        {pivotDate.getFullYear()}년 {pivotDate.getMonth() + 1}월
                    </span></div>
                <div className="date_right"><Button onClick={onIncreaseMonth} text={">"} /></div>
            </div>
            <div className="top-section">
                <div className="section-3">
                    <GoldList data={monthlyData} />
                </div>
            </div>

            <div className="top-section">
                <div className="section-4">
                    <h3>📌 자산 카테고리 집계</h3>
                    <GoldBarChart />
                </div>

            </div>
        </div>
    )
};

export default Home;