import { useEffect, useRef, useState } from "react";

export function useCountUp(value, duration = 800) {

    //초기값 0으로 세팅 
    const [displayValue, setDisplayValue] = useState(0);
    const startValueRef = useRef(0);
    const startTimeRef = useRef(null);

    useEffect(() => {
        startValueRef.current = displayValue;
        startTimeRef.current = null;

        const animate = (time) => {
            if (!startTimeRef.current) startTimeRef.current = time;
            const progress = Math.min(
                (time - startTimeRef.current) / duration,
                1
            );

            const nextValue =
                startValueRef.current +
                (value - startValueRef.current) * progress;

            setDisplayValue(Math.floor(nextValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value, duration]);

    return displayValue;
}
