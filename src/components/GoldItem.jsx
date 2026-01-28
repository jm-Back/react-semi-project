import { getGoldImage } from "../util/get-gold-image"
import Button from "./common/Button"
import "./GoldItem.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { GoldTrackerDispatchContext } from "../context/GoldTrackerDispatchContext"; // ✅ context 폴더에서 가져오기

const GoldItem = ({ seq, purchaseDate, categoryId, gram, type, price, targetData }) => {

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
                className={`img_section img_section_${type}`}>
                {type === 'BUY' ? <img src={getGoldImage("BUY")} />
                    : <img src={getGoldImage("SELL")} />}

                <div>{type === 'BUY' ? '매입!' : '매도'}</div>
            </div>
            <div
                onClick={() => nav(`/record/${seq}`)}
                className="info_section">
                <div className="created_date">
                    {new Date(purchaseDate).toLocaleDateString()}
                </div>
                <div className="content">
                    {gram}
                </div>
            </div>
            <div className="button_section" >
                <Button onClick={() => handleDelete(seq)} type={"DELETE"} text={"삭제"} />
            </div>
        </div>
    )

}

export default GoldItem;