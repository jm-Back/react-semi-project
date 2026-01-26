import Button from "./Button";
import "./GoldList.css"
import GoldItem from "./GoldItem"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GoldList = ({ data }) => {
    const nav = useNavigate();
    const [sortType, setSortType] = useState("latest");

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    const getSortedData = () => {
        return data.toSorted((a, b) => {
            if (sortType == "higher") return Number(a.price) - Number(b.price);
            else if (sortType == "cheaper") return Number(b.price) - Number(a.price);
            else return Number(b.purchaseDate) - Number(a.purchaseDate);
        })
    }

    const sortedData = getSortedData();

    console.log(data);

    return (
        <div>
            <div className="GoldList">
                <div className="menu_bar">
                    <select onChange={onChangeSortType}>
                        <option value={"latest"}>최신순</option>
                        <option value={"cheaper"}> 가격 낮은순</option>
                        <option value={"higher"}> 가격 높은순</option>
                    </select>
                    <div>
                        <Button onClick={() => nav(`/new`)} text={"장부 쓰기 ✏️"}
                            type={"POSITIVE"}
                        ></Button>
                    </div>

                </div>
                <div className="list_wrapper">
                    {sortedData.map((item) => <GoldItem key={item.seq} {...item} />)}
                </div>
            </div>
        </div>
    )

}

export default GoldList;