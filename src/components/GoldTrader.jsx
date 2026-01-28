import { useEffect, useState } from "react";
import TickerSlider from "./TickerSlider";
import TickerItem from "./TickerItem";

export default function GoldTrader({ type }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (type === "TODAY_PRICE") {
            setItems([
                { name: "USD/KRW", value: 1345.20, diff: +3.1, history: [1332, 1336, 1340, 1342, 1345] },
                { name: "GOLD", value: 93500, diff: -120, history: [2342, 232423, 94000, 93800, 93600, 93500] },
                { name: "KRX GOLD", value: 93200, diff: +80, history: [94000, 93800, 93600, 93500] },
                { name: "BTC", value: 72000000, diff: +1.2, history: [70000000, 70500000, 71000000, 72000000] },
            ]);
        }

        if (type === "TOTAL_ASSET") {
            setItems([
                { label: "금 보유량 (단위: g)", value: 10.75 },

            ]);
        }

        if (type === "PROFIT_LOSS") {
            setItems([
                { label: "오늘자 평가손익", value: +120000, flag: "▲" },
            ]);
        }
    }, [type]);

    return (
        <TickerSlider items={items}>
            {(item) =>
                type === "TODAY_PRICE" ? (
                    <TickerItem item={item} />
                ) : (
                    <div className="simple-ticker">
                        <div className="label">{item.label}</div>
                        <div className={`value ${item.flag ? "flag" : ""}`}>
                            <span>{item.flag}</span>
                            {item.value.toLocaleString()}
                        </div>
                    </div>
                )
            }
        </TickerSlider >
    );
}