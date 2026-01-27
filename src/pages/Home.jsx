import { useContext, useState } from "react";
import { GoldTrackerStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import GoldList from "../components/GoldList";

import GoldChart from "../components/GoldChart";
import GoldTrader from "../components/GoldTrader";
import GoldAssetSummary from "../components/GoldAssetSummary";
import GoldStampCalendar from "../components/GoldStampCalendar";


import "./Home.css";

//해당 월 데이터 
const getMonthlyDate = (pivotDate, data) => {
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    const endTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth() + 1,
        0,
        23,
        59,
        59
    ).getTime();

    return data.filter((item) => beginTime <= item.purchaseDate && item.purchaseDate <= endTime)
}

const Home = () => {

    const data = useContext(GoldTrackerStateContext)

    //날짜 보관 
    const [pivotDate, setPivotDate] = useState(new Date());
    const monthlyData = getMonthlyDate(pivotDate, data);

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }


    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    //납입일
    const goldPaidDates = [
        "2026-01-05",
        "2026-01-01",
        "2026-01-11",
        "2026-01-20",
        "2026-01-26",
    ];

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

            <div className="date-selector">
                <div className="date_left"><Button onClick={onDecreaseMonth} text={"<"} /></div>
                <div className="date_center">
                    <span>
                        {pivotDate.getFullYear()}년 {pivotDate.getMonth() + 1}월
                    </span></div>
                <div className="date_right"><Button onClick={onIncreaseMonth} text={">"} /></div>

            </div>
            <div className="top-section">
                <div className="section-2">
                    <h3>🪙 금 매입/매도 캘린더</h3>
                    <GoldStampCalendar paidDates={goldPaidDates} pivotDate={pivotDate}
                    />
                </div>
                <div className="section-3">
                    <GoldList data={monthlyData} />
                </div>
            </div>

            <hr />
            <div className="top-section">
                <div className="section-4">
                    <h3>📌 {pivotDate.getMonth() + 1}월 금장부 요약</h3>
                    <GoldChart />
                </div>

            </div>
        </div>
    )

};

export default Home;