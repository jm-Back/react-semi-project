import "./NoData.css";

export default function NoData({ message = "데이터가 없습니다" }) {
    return (
        <div className="no-data">
            <div className="no-data-icon">📭</div>
            <div className="no-data-text">{message}</div>
        </div>
    );
}
