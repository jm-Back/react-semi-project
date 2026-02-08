import "./GoldList.css"
import GoldItem from "./GoldItem"
import GoldNewModal from "./GoldNewModal";
import GoldSellModal from "./GoldSellModal";
import Button from "./common/Button";

import NoData from "./common/NoData";
import { useState } from "react";

const GoldList = ({ data }) => {

    //정렬
    const [sortType, setSortType] = useState("latest");
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    const getSortedData = () => {
        return data.toSorted((a, b) => {
            if (sortType == "higher") return Number(a.tradeAmount) - Number(b.tradeAmount);
            else if (sortType == "cheaper") return Number(b.tradeAmount) - Number(a.tradeAmount);
            else if (sortType == "heavy") return Number(b.gram) - Number(a.gram);
            else return Number(b.tradeDate) - Number(a.tradeDate);
        })
    }

    //금 매입/매도 기록 :: 모달 
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [isSellOpen, setIsSellOpen] = useState(false);

    //data 정렬해서 리턴 
    const sortedData = getSortedData();

    return (
        <div>
            <div className="GoldList">
                <div className="menu_bar">
                    <select onChange={onChangeSortType}>
                        <option value={"latest"}>최신순</option>
                        <option value={"cheaper"}> 매입가 낮은순</option>
                        <option value={"higher"}> 매입가 높은순</option>
                        <option value={"heavy"}> 그램(g)순</option>
                    </select>
                    <div>
                        <Button
                            onClick={() => setIsNewOpen(true)}
                            text={"매입 기록 ✏️"}
                            type={"POSITIVE"}
                        />

                        {isNewOpen && (
                            <GoldNewModal onClose={() => setIsNewOpen(false)} isOpen={isNewOpen} />
                        )}
                    </div>
                    <div>
                        <Button onClick={() => setIsSellOpen(true)} text={"매도👋🏻"}
                            type={"NEGATIVE"}
                        />
                        {isSellOpen && (
                            <GoldSellModal onClose={() => setIsSellOpen(false)} isOpen={isSellOpen} />
                        )}
                    </div>

                </div>
                <div className="list_wrapper">
                    {sortedData.length === 0 && (
                        <div className="no-data-wrapper">
                            <NoData message="거래 기록이 없습니다" />
                        </div>
                    )}

                    {sortedData.map((item) => (
                        <GoldItem key={item.seq} {...item} />
                    ))}
                </div>

            </div>
        </div>
    )

}

export default GoldList;