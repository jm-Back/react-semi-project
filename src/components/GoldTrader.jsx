import { useMemo, useContext } from "react";
import TickerSlider from "./TickerSlider";
import TickerItem from "./TickerItem";
import { AssetSummaryContext } from "../context/AssetSummaryContext";

export default function GoldTrader({ type }) {
    const summary = useContext(AssetSummaryContext);
    const num = (v) => (typeof v === "number" && !isNaN(v) ? v : 0);

    const items = useMemo(() => {
        if (!summary) return [];

        switch (type) {
            case "TOTAL_ASSET": {
                const totalGram = num(summary.totalGram);

                return [
                    {
                        label: "금 보유량 (단위: g)",
                        value: `${totalGram} g`,
                    },
                ];
            }

            case "PROFIT_LOSS": {
                const realizedProfit = num(summary.realizedProfit);
                const profitRate = num(summary.profitRate);

                return [
                    {
                        label: "실현 손익",
                        value: realizedProfit,
                        flag: realizedProfit >= 0 ? "▲" : "▼",
                    },
                    {
                        label: "수익률 (%)",
                        value: profitRate.toFixed(2),
                        flag: profitRate >= 0 ? "▲" : "▼",
                    },
                ];
            }
            case "TODAY_PRICE": {
                const buyAmount = num(summary.tradeAmount);
                const currentValue = num(summary.todaysValue);

                return [
                    {
                        name: "총매입가",
                        value: buyAmount,
                        diff: currentValue - buyAmount,
                        history: [buyAmount, currentValue],
                    },
                ];
            }
            default:
                return [];
        }
    }, [summary, type]);

    if (!summary) return null;

    return (
        <TickerSlider items={items}>
            {(item) =>
                type === "TODAY_PRICE" ? (
                    <TickerItem item={item} />
                ) : (
                    <div className="simple-ticker">
                        <div className="label">{item.label}</div>
                        <div className={`value ${item.flag ? "flag" : ""}`}>
                            {item.flag && <span>{item.flag}</span>}
                            {typeof item.value === "number"
                                ? item.value.toLocaleString() + " 원"
                                : item.value}
                        </div>
                    </div>
                )
            }
        </TickerSlider >
    );
}