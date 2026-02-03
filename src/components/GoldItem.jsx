import { getGoldImage } from "../util/get-gold-image"
import Button from "./common/Button"
import "./GoldItem.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { GoldTrackerDispatchContext } from "../context/GoldTrackerDispatchContext"; // ✅ context 폴더에서 가져오기

//DB 컬럼이름이랑 맞춤 
const GoldItem = ({
    seq,
    tradeDate,
    tradeType,
    code,              // ✅ 자산코드
    gram,
    tradeAmount,
    unitPrice,
    realizedProfit,
    content, }) => {

    const nav = useNavigate(); //네비게이트 함수 저장 
    const { onDelete } = useContext(GoldTrackerDispatchContext);

    const handleDelete = (seq) => {
        const ok = window.confirm(
            "이 거래 기록을 삭제할까요?\n삭제된 데이터는 복구할 수 없습니다."
        );

        if (!ok) return;

        // 삭제 API 호출
        onDelete(seq);
    };


    return (
        <div className="GoldItem">
            <div
                onClick={() => nav(`/record/${seq}`)}
                className={`img_section img_section_${tradeType}`}>
                {tradeType === 'BUY' ? <img src={getGoldImage("BUY")} />
                    : <img src={getGoldImage("SELL")} />}
                <div>{code}</div>
            </div>
            <div
                onClick={() => nav(`/record/${seq}`)}
                className="info_section">
                <div className="created_date">
                    {new Date(tradeDate).toLocaleDateString()}
                </div>
                <div className="trade_row">
                    <div className="kv">
                        <span className="key">수량</span>
                        <span className="value">{gram} g</span>
                    </div>

                    <div className="kv">
                        <span className="key">
                            {tradeType === "BUY" ? "매입가" : "매도가"}
                        </span>
                        <span className="value">{tradeAmount.toLocaleString()}원</span>
                    </div>

                    {tradeType === "SELL" && (
                        <div className={`profit ${realizedProfit >= 0 ? "plus" : "minus"}`}>
                            <span className="key">손익</span>
                            <span className="value">
                                {realizedProfit.toLocaleString()}원
                            </span>
                        </div>
                    )}
                </div>


                {content && (
                    <div className="memo">
                        {content}
                    </div>
                )}
            </div>
            {/* 주석 걸어버림 
            <div className="button_section" >
                <Button onClick={(e) => { e.stopPropagation(); handleDelete(seq); }} type={"DELETE"} text={"🗑️"} />
            </div>
            */}
        </div>
    )

}

export default GoldItem;