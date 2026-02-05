import "./GoldSellModal.css";
import { formatNumber } from "../util/get-comma.js";

import { useContext, useState, useEffect } from "react";
import { GoldTrackerDispatchContext } from "../context/GoldTrackerDispatchContext"; // ✅ context 폴더에서 가져오기
// import { useAssets } from "../context/AssetContext";

//백엔드
import { getTradeAvailable } from "../api/assetApi"

const GoldSellModal = ({ onClose, isOpen }) => {

    const [getAssetAvailable, setTradeAvailable] = useState([]);
    useEffect(() => {

        if (!isOpen) {
            console.log("GoldSellModal: 모달 닫힘, API 호출 안 함");
            return; // 모달이 열리지 않았으면 API 호출 안 함
        }

        console.log("GoldSellModal: 모달 열림, API 호출 시작");

        if (!isOpen) return;
        getTradeAvailable()
            .then(res => setTradeAvailable(res.data))
            .catch(console.error);
    }, [isOpen]);

    // const { getAvailableQuantity } = useAssets();

    const { onCreateSell } = useContext(GoldTrackerDispatchContext);

    const [selectedLot, setSelectedLot] = useState(null);
    const [form, setForm] = useState({
        seq: 0,
        tradeDate: new Date().toISOString().slice(0, 10),
        tradeType: "SELL",
        tradeAmount: "",
        content: "",
    });

    // const availableQuantity = getAvailableQuantity(form.assetType || "BAR");

    // 유효성 검사 포함
    const handleSubmit = () => {
        if (!selectedLot) {
            alert("매도할 자산을 선택해주세요");
            return;
        }
        if (!form.tradeAmount || Number(form.tradeAmount) <= 0) {
            alert("매도 금액을 입력해주세요");
            return;
        }

        onCreateSell(
            selectedLot.seq,
            form.tradeDate,
            "SELL",
            Number(form.tradeAmount),
            form.content
        );

        onClose();
    };

    //선택 자산의 매입일보다 뒤에 날짜 선택
    const minDate = selectedLot ? new Date(selectedLot.tradeDate).toISOString().slice(0, 10) : "";

    return (
        <div className="modal_backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>금 매도 💰</h2>

                <div className="row">
                    <label className="date_label">매도일자</label>
                    <input
                        type="date"
                        min={minDate}
                        value={form.tradeDate}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                tradeDate: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="asset_section">
                    <h4>보유 자산 선택</h4>
                    <div className="asset_select_list">
                        {getAssetAvailable.map((lot) => (
                            <div
                                key={lot.seq}
                                className={`asset_card ${selectedLot?.seq === lot.seq ? "active" : ""
                                    }`}
                                onClick={() => setSelectedLot(lot)}
                            >
                                <div className="asset_name">{lot.name}</div>
                                <div className="asset_meta">

                                    <span>매입일: {lot.tradeDate}</span>
                                    <span>{lot.gram} g</span>
                                    <span>{lot.tradeAmount.toLocaleString()}원</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="총 매도 금액"
                    value={formatNumber(form.tradeAmount)}  //import 한 콤마 찍는거 
                    onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, ""); // 숫자만
                        if (!/^\d*$/.test(rawValue)) return; // 숫자만 허용

                        setForm({
                            ...form,
                            tradeAmount: rawValue,
                        });
                    }}
                />

                <textarea
                    placeholder="메모"
                    value={form.content}
                    onChange={(e) =>
                        setForm({ ...form, content: e.target.value })
                    }
                />

                <div className="modal_btns">
                    <button onClick={handleSubmit}>저장</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default GoldSellModal;
