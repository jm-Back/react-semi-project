import "./GoldAssetSummary.css";
import { useCountUp } from "../hooks/useCountUp";
import { useEffect, useState } from "react";

export default function GoldAssetSummary({ name, holdings, }) {
    const totalValue = holdings.reduce(
        (sum, item) => sum + item.gram * item.pricePerGram,
        0
    );

    //애니메이션 효과 value 
    const animatedValue = useCountUp(totalValue);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(false);
        const id = setTimeout(() => setShow(true), 50);
        return () => clearTimeout(id);
    }, [totalValue]);

    return (
        <div className="gold-summary">
            <strong>{name}</strong> 님의 금🏆 자산 평가액은 {" "}
            <span className="price">
                {animatedValue.toLocaleString()}원
            </span>
            <span>입니다. </span>
            <div className={`summary-mention fade-slide ${show ? "show" : ""}`}>
                📢 매입가 대비
                <span className="mention-price"> 0000원</span> 수익 입니다!
            </div>
        </div>
    );
}