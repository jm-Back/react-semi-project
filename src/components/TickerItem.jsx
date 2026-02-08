import MiniLineChart from "./MiniLineChart";

function TickerItem({ item }) {
    const isUp = item.diff > 0;

    return (
        <div className="ticker-item">
            <div className="">
                <div className="name">{item.name}</div>
                <span className="price">{item.value.toLocaleString()} 원</span>
                {item.diff != null && (
                    <span className={`diff ${isUp ? "up" : "down"}`}>
                        {isUp ? "▲" : "▼"} {Math.abs(item.diff).toLocaleString()}
                    </span>
                )}
            </div>
            <MiniLineChart data={item.history} isUp={isUp} />
        </div>
    );
}

export default TickerItem;
