import './App.css'

import { createContext, useReducer, useRef } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AssetProvider } from "./context/AssetContext";
import { GoldTrackerDispatchContext } from "./context/GoldTrackerDispatchContext"
import { reducer } from "./context/reducer";

import Home from './pages/Home';

export const GoldTrackerStateContext = createContext();
// export const GoldTrackerDispatchContext = createContext();


const mockData = [
    {
        seq: 1,
        purchaseDate: new Date("2026-01-03").getTime(),
        asset_type: 'CNG',
        gram: 10,
        type: "BUY",
        price: 34000,
        content: "국제금 4% 급락으로 구매완료!"
    },
    {
        seq: 2,
        purchaseDate: new Date("2026-01-10").getTime(),
        asset_type: 'BAR',
        gram: 5,
        type: "SELL",
        price: 47000,
        targetData: [
            { seq: 1, gram: 55, buyPrice: 34000 },
        ],
        content: "급락으로 샀던거.. 얼마에 팔았당..."
    },
    {
        seq: 3,
        purchaseDate: new Date("2026-01-26").getTime(),
        asset_type: 'ACC_24',
        gram: 3.75,
        type: "BUY",
        price: 223000,
        content: "귀금속으로 구매했다 오래 껴야지 ^_^"
    },
];

function App() {
    const [data, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(5);  //3으로 초기화

    // //장부 추가 
    // const onCreate = (purchaseDate, categoryId, gram, type, price, targetData, content) => {
    //     dispatch({
    //         type: "CREATE",
    //         data: {
    //             seq: idRef.current++,
    //             purchaseDate,
    //             categoryId,
    //             gram,
    //             type,
    //             price,
    //             targetData,
    //             content,
    //         },
    //     })
    // }

    // //삭제
    // const onDelete = (seq) => {
    //     dispatch({
    //         type: "DELETE",
    //         seq
    //     })
    // }

    return (
        <>
            <AssetProvider>
                <GoldTrackerStateContext.Provider value={data}>
                    <GoldTrackerDispatchContext.Provider value={dispatch}>
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                        </Routes>
                    </GoldTrackerDispatchContext.Provider>
                </GoldTrackerStateContext.Provider>
            </AssetProvider>
        </>

    )
}

export default App
