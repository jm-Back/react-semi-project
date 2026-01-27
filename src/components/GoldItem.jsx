import { getGoldImage } from "../util/get-gold-image"
import Button from "./Button"
import "./GoldItem.css"
import { useNavigate } from "react-router-dom"

const GoldItem = ({ seq, purchaseDate, categoryId, gram, type, price, targetData }) => {

    const nav = useNavigate(); //네비게이트 함수 저장 


    console.log(seq);
    return (
        <div className="GoldItem">
            <div
                onClick={() => nav(`/record/${seq}`)}
                className={`img_section img_section_${type}`}>
                <img src={getGoldImage("y")} />
                <div>{type === '1' ? '매수!' : '안녕'}</div>
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
            <div className="button_section">
                <Button onClick={() => nav(`/edit/${seq}`)} text={"수정하기"} />
            </div>
        </div>
    )

}

export default GoldItem;