import "./GoldNewModal.css";
import { formatNumber } from "../util/get-comma.js";

import { useContext, useState } from "react";
import { GoldTrackerDispatchContext } from "../context/GoldTrackerDispatchContext"; // ✅ context 폴더에서 가져오기

const GoldNewModal = ({ onClose }) => {
    const { onCreate } = useContext(GoldTrackerDispatchContext);
    const [form, setForm] = useState({
        tradeType: "BUY",
        tradeDate: Date.now(),
        assetType: "",
        quantityG: "",
        tradeAmount: "",
        content: "",
    });

    //유효성 검사 포함 
    const handleSubmit = () => {
        const quantityG = Number(form.quantityG);
        const tradeAmount = Number(form.tradeAmount);

        if (!quantityG || quantityG <= 0) {
            alert("그램(g)을 올바르게 입력해주세요");
            return;
        }

        if (!tradeAmount || tradeAmount <= 0) {
            alert("매입가를 올바르게 입력해주세요");
            return;
        }

        onCreate(
            "BUY",
            form.tradeDate,
            form.assetType,
            quantityG,
            tradeAmount,
            form.content
        );

        onClose();
    };

    return (
        <div className="modal_backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>금 매입 기록 ✨</h2>

                <div className="row">
                    <input type="date" onChange={(e) =>
                        setForm({ ...form, tradeDate: new Date(e.target.value).getTime(), })} />

                    <select onChange={(e) =>
                        setForm({ ...form, assetType: e.target.value })}>
                        <option value={"CNG"}>콩알금</option>
                        <option value={"BAR"}>골드바</option>
                        <option value={"ACC"}>귀금속</option>
                    </select>
                </div>

                <input placeholder="총 그램(g)"
                    min="0"
                    step="0.01"
                    type="number"
                    value={form.quantityG}
                    onChange={(e) =>
                        setForm({ ...form, quantityG: e.target.value })} />
                <input
                    type="text"
                    placeholder="매입가"
                    value={formatNumber(form.tradeAmount)}
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
                    onChange={(e) =>
                        setForm({ ...form, content: e.target.value })} />

                <div className="modal_btns">
                    <button onClick={handleSubmit}>저장</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default GoldNewModal;