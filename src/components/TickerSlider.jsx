import { useEffect, useState } from "react";
import "./TickerSlider.css";

const SLIDE_INTERVAL = 3500;

export default function TickerSlider({ items, children }) {
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (items.length === 0) return;

        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, SLIDE_INTERVAL);

        return () => clearInterval(id);
    }, [items.length]);

    //등장 효과
    useEffect(() => {
        setShow(false);
        const id = setTimeout(() => setShow(true), 50);
        return () => clearTimeout(id);
    }, []);

    return (
        <div className={`ticker-container fade-slide ${show ? "show" : ""}`}>
            <div
                className="ticker-track"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {items.map((item) => (
                    <div key={item.name || item.label} className="ticker-item">
                        {children(item)}
                    </div>
                ))}
            </div>
        </div>
    );
}
