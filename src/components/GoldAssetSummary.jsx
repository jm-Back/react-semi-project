import "./GoldAssetSummary.css";
import { useCountUp } from "../hooks/useCountUp";
import { useEffect, useState, useContext } from "react";
import { AssetSummaryContext } from "../context/AssetSummaryContext";

export default function GoldAssetSummary() {

    const summary = useContext(AssetSummaryContext);
    const num = (v) => (typeof v === "number" && !isNaN(v) ? v : 0);

    const currentValue = num(summary?.todaysValue);

    //애니메이션 효과 value 
    const animatedValue = useCountUp(currentValue);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(false);
        const id = setTimeout(() => setShow(true), 50);
        return () => clearTimeout(id);
    }, [currentValue]);

    return (
        <div className="gold-summary">
            <strong>백정민</strong> 님의 금🏆 자산 평가액은 {" "}
            <span className="price">
                {animatedValue.toLocaleString()}원
            </span>
            <span>입니다. </span>
            <div className={`summary-mention fade-slide ${show ? "show" : ""}`}>
                📢 <span></span><a href="https://obank.kbstar.com/quics?page=C023489#loading"> KB국민은행 골드 가격조회 및 시장동향</a>
            </div>
        </div>
    );
}