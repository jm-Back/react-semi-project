import "./GoldSellModal.css";
import { formatNumber } from "../util/get-comma.js";

import { useContext, useState } from "react";
import { GoldTrackerDispatchContext } from "../context/GoldTrackerDispatchContext"; // ✅ context 폴더에서 가져오기
import { useAssets } from "../context/AssetContext";


const mockAssetLots = [
    {
        seq: 101,
        name: "골드바 10g",
        gram: 10,
        tradeDate: "2025-01-02",
        tradeAmount: 980000,
    },
    {
        seq: 102,
        name: "콩알금 3.5g",
        gram: 3.5,
        tradeDate: "2025-01-02",
        tradeAmount: 980000,
    },
    {
        seq: 103,
        name: "24K 반지",
        gram: 5,
        tradeDate: "2025-01-02",
        tradeAmount: 980000,
    },
    {
        seq: 213,
        name: "24K 반지",
        gram: 5,
        tradeDate: "2025-01-02",
        tradeAmount: 980000,
    },
];


const GoldSellModal = ({ onClose }) => {
    const { getAvailableQuantity } = useAssets();
    const { onCreate } = useContext(GoldTrackerDispatchContext);

    const [selectedLot, setSelectedLot] = useState(null);
    const [form, setForm] = useState({
        seq: 0,
        tradeDate: Date.now(),
        tradeType: "SELL",
        tradeAmount: "",
        content: "",
    });

    const availableQuantity = getAvailableQuantity(form.assetType || "BAR");

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

        console.table([{
            seq: selectedLot.seq,
            type: "SELL",
            tradeDate: form.tradeDate,
            name: selectedLot.name,
            gram: selectedLot.gram,
            tradeAmount: Number(form.tradeAmount),
            content: form.content,
        }]);


        onCreate(
            selectedLot.seq,
            "SELL",
            form.tradeDate,
            selectedLot.name,
            selectedLot.gram,
            Number(form.tradeAmount),
            form.content
        );


        onCreate(
            selectedLot.seq,
            "SELL",
            form.tradeDate,
            selectedLot.name,
            selectedLot.gram, // 🔥 수량은 LOT 기준 고정
            Number(form.tradeAmount),
            form.content
        );

        onClose();
    };

    return (
        <div className="modal_backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>금 매도 💰</h2>

                <div className="row">
                    <label className="date_label">매도일자</label>
                    <input
                        type="date"
                        value={new Date(form.tradeDate).toISOString().slice(0, 10)}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                tradeDate: new Date(e.target.value).getTime(),
                            })
                        }
                    />
                </div>

                <div className="asset_section">
                    <h4>보유 자산 선택</h4>
                    <div className="asset_select_list">
                        {mockAssetLots.map((lot) => (
                            <div
                                key={lot.seq}
                                className={`asset_card ${selectedLot?.seq === lot.seq ? "active" : ""
                                    }`}
                                onClick={() => setSelectedLot(lot)}
                            >
                                <div className="asset_name">{lot.name}</div>
                                <div className="asset_meta">
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
