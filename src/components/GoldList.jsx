import Button from "./common/Button";
import "./GoldList.css"
import GoldItem from "./GoldItem"
import GoldNewModal from "./GoldNewModal";
import GoldSellModal from "./GoldSellModal";
import NoData from "./common/NoData";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GoldList = ({ data }) => {
    const nav = useNavigate();
    const [sortType, setSortType] = useState("latest");
    //금 매입 기록 :: 모달 
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [isSellOpen, setIsSellOpen] = useState(false);


    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    const getSortedData = () => {
        return data.toSorted((a, b) => {
            if (sortType == "higher") return Number(a.price) - Number(b.price);
            else if (sortType == "cheaper") return Number(b.price) - Number(a.price);
            else if (sortType == "heavy") return Number(b.gram) - Number(a.gram);
            else return Number(b.purchaseDate) - Number(a.purchaseDate);
        })
    }

    const sortedData = getSortedData();

    return (
        <div>
            <div className="GoldList">
                <div className="menu_bar">
                    <select onChange={onChangeSortType}>
                        <option value={"latest"}>최신순</option>
                        <option value={"cheaper"}> 가격 낮은순</option>
                        <option value={"higher"}> 가격 높은순</option>
                        <option value={"heavy"}> 무게순</option>

                    </select>
                    <div>
                        <Button
                            onClick={() => setIsNewOpen(true)}
                            text={"매입 기록 ✏️"}
                            type={"POSITIVE"}
                        />

                        {isNewOpen && (
                            <GoldNewModal onClose={() => setIsNewOpen(false)} />
                        )}
                    </div>
                    <div>
                        <Button onClick={() => setIsSellOpen(true)} text={"매도👋🏻"}
                            type={"NEGATIVE"}
                        />
                        {isSellOpen && (
                            <GoldSellModal onClose={() => setIsSellOpen(false)} />
                        )}
                    </div>

                </div>
                <div className="list_wrapper">
                    {sortedData.length === 0 ? (
                        <NoData message="거래 기록이 없습니다" />
                    ) : (
                        sortedData.map((item) => <GoldItem key={item.seq} {...item} />)
                    )}
                </div>
            </div>
        </div>
    )

}

export default GoldList;