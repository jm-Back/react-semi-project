import "./GoldNewModal.css";
import { useContext, useState } from "react";
import { GoldTrackerDispatchContext } from "../context/GoldTrackerDispatchContext"; // ✅ context 폴더에서 가져오기

const GoldNewModal = ({ onClose }) => {
    const { onCreate } = useContext(GoldTrackerDispatchContext);
    const [form, setForm] = useState({
        purchaseDate: Date.now(),
        categoryId: "",
        gram: "",
        type: "BUY",
        targetData: null,
        content: "",
        price: "",
    });

    //유효성 검사 포함 
    const handleSubmit = () => {
        const gram = Number(form.gram);
        const price = Number(form.price);

        if (!gram || gram <= 0) {
            alert("그램(g)을 올바르게 입력해주세요");
            return;
        }

        if (!price || price <= 0) {
            alert("매입가를 올바르게 입력해주세요");
            return;
        }

        onCreate(
            form.purchaseDate,
            form.categoryId,
            gram,
            "BUY",
            null,
            form.content,
            price
        );

        onClose();
    };

    return (
        <div className="modal_backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>금 매입 기록 ✨</h2>


                <div className="row">
                    <input type="date" onChange={(e) =>
                        setForm({ ...form, purchaseDate: new Date(e.target.value).getTime(), })} />

                    <select onChange={(e) =>
                        setForm({ ...form, categoryId: e.target.value })}>
                        <option value={"bar"}>골드바</option>
                        <option value={"cong"}>콩알금</option>
                        <option value={"acc"}>귀금속</option>
                        <option value={"krx"}>KRX금현물</option>
                    </select>
                </div>


                <input placeholder="그램(g)"
                    min="0"
                    step="0.01"
                    type="number"
                    value={form.gram}
                    onChange={(e) =>
                        setForm({ ...form, gram: e.target.value })} />
                <input placeholder="매입가"
                    min="0"
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                        setForm({ ...form, price: e.target.value })} />

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