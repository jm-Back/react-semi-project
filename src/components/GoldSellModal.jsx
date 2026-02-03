import "./GoldSellModal.css";
import { useContext, useState } from "react";
import { GoldTrackerDispatchContext } from "../context/GoldTrackerDispatchContext"; // ✅ context 폴더에서 가져오기
import { useAssets } from "../context/AssetContext";


const mockAssetLots = [
    {
        lotId: 101,
        code: "BAR",
        name: "골드바 10g",
        quantity: 10,
        buyPrice: 980000,
        buyDate: "2025-12-01",
    },
    {
        lotId: 102,
        code: "CNG",
        name: "콩알금 3.5g",
        quantity: 3.5,
        buyPrice: 340000,
        buyDate: "2026-01-15",
    },
    {
        lotId: 103,
        code: "ACC_24",
        name: "24K 반지",
        quantity: 5,
        buyPrice: 520000,
        buyDate: "2025-11-03",
    },
    {
        lotId: 213,
        code: "ACC_24",
        name: "24K 반지",
        quantity: 5,
        buyPrice: 520000,
        buyDate: "2025-11-03",
    },
];


const GoldSellModal = ({ onClose }) => {
    const { getAvailableQuantity } = useAssets();
    const { onCreate } = useContext(GoldTrackerDispatchContext);

    const [selectedLot, setSelectedLot] = useState(null);
    const [form, setForm] = useState({
        tradeDate: Date.now(),
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

        onCreate(
            "SELL",
            Date.now(),
            selectedLot.code,
            selectedLot.quantity, // 🔥 수량은 LOT 기준 고정
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
                                key={lot.lotId}
                                className={`asset_card ${selectedLot?.lotId === lot.lotId ? "active" : ""
                                    }`}
                                onClick={() => setSelectedLot(lot)}
                            >
                                <div className="asset_name">{lot.name}</div>
                                <div className="asset_meta">
                                    <span>{lot.quantity} g</span>
                                    <span>{lot.buyPrice.toLocaleString()}원</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <input
                    type="number"
                    placeholder="총 매도 금액"
                    value={form.tradeAmount}
                    onChange={(e) =>
                        setForm({ ...form, tradeAmount: e.target.value })
                    }
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
