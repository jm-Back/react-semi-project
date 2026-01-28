import "./GoldNewModal.css";
import { useContext, useState } from "react";
import { GoldTrackerDispatchContext } from "../App";
import { useAssets } from "../context/AssetContext";

const GoldSellModal = ({ onClose }) => {
    const { getAvailableQuantity } = useAssets();
    const { onCreate } = useContext(GoldTrackerDispatchContext);

    const [form, setForm] = useState({
        tradeDate: Date.now(),
        asset_type: "CNG",
        quantity: "",
        tradeAmount: "",
        content: "",
    });


    const availableQuantity = getAvailableQuantity(form.assetType || "BAR");

    // 유효성 검사 포함
    const handleSubmit = () => {
        const quantity = Number(form.quantity);
        const tradeAmount = Number(form.tradeAmount);

        if (!quantity || quantity <= 0) {
            alert("판매 수량(g)을 올바르게 입력해주세요");
            return;
        }

        if (!tradeAmount || tradeAmount <= 0) {
            alert("총 거래 금액을 올바르게 입력해주세요");
            return;
        }

        onCreate(
            form.tradeDate,
            form.assetType,
            quantity,
            "SELL",
            tradeAmount,
            form.content
        );

        onClose();
    };

    return (
        <div className="modal_backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>금 매도 기록 💰</h2>

                <div className="row">
                    <input
                        type="date"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                tradeDate: new Date(e.target.value).getTime(),
                            })
                        }
                    />

                    <select value={form.assetType}            // 반드시 form.assetType이 있어야 함
                        onChange={(e) => setForm({ ...form, assetType: e.target.value })}>
                        <option value="BAR">골드바</option>
                        <option value="CNG">콩알금</option>
                        <option value="ACC_24">귀금속(24K)</option>
                        <option value="ACC_18">귀금속(18K)</option>
                        <option value="ACC_14">귀금속(14K)</option>

                    </select>

                </div>
                <div>현재 보유량: {availableQuantity.toFixed(2)} g</div>
                <input
                    placeholder="판매 수량(g)"
                    min="0"
                    step="0.01"
                    type="number"
                    value={form.quantity}
                    onChange={(e) =>
                        setForm({ ...form, quantity: e.target.value })
                    }
                />

                <input
                    placeholder="총 거래 금액"
                    min="0"
                    type="number"
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
