import './App.css'

import { createContext, useReducer, useRef, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AssetProvider } from "./context/AssetContext";
import { GoldTrackerDispatchContext } from "./context/GoldTrackerDispatchContext"
import { reducer } from "./context/reducer";


//백엔드 통신 테스트 
import { getCategoryData } from './api/assetApi';

import Home from './pages/Home';

export const GoldTrackerStateContext = createContext();

const mockData = [
    {
        seq: 1,
        tradeDate: new Date("2026-02-03").getTime(),
        tradeType: "BUY",
        code: 'CNG',
        gram: 10,
        tradeAmount: 34000,
        unitPrice: 3000,
        realizedProfit: 0,
        content: "국제금 4% 급락으로 구매완료!"
    },
    {
        seq: 2,
        tradeDate: new Date("2026-02-10").getTime(),
        tradeType: "SELL",
        code: 'BAR',
        gram: 5,
        tradeAmount: 47000,
        unitPrice: 3000,
        realizedProfit: 12000,
        content: "급락으로 샀던거.. 얼마에 팔았당..."
    },
    {
        seq: 3,
        tradeDate: new Date("2026-02-26").getTime(),
        tradeType: "BUY",
        code: 'ACC',
        gram: 3.75,
        tradeAmount: 223000,
        unitPrice: 3000,
        realizedProfit: 0,
        content: "귀금속으로 구매했다 오래 껴야지 ^_^"
    },
    {
        seq: 4,
        tradeDate: new Date("2026-02-26").getTime(),
        tradeType: "BUY",
        code: 'ACC',
        gram: 3.75,
        tradeAmount: 223000,
        unitPrice: 3000,
        realizedProfit: 0,
        content: "귀금속으로 구매했다 오래 껴야지 ^_^"
    },
    {
        seq: 5,
        tradeDate: new Date("2026-02-26").getTime(),
        tradeType: "BUY",
        code: 'ACC',
        gram: 3.75,
        tradeAmount: 223000,
        unitPrice: 3000,
        realizedProfit: 0,
        content: "귀금속으로 구매했다 오래 껴야지 ^_^"
    },
    {
        seq: 6,
        tradeDate: new Date("2026-02-26").getTime(),
        tradeType: "BUY",
        code: 'ACC',
        gram: 3.75,
        tradeAmount: 223000,
        unitPrice: 3000,
        realizedProfit: 0,
        content: "귀금속으로 구매했다 오래 껴야지 ^_^"
    },
];

function App() {

    // useEffect(() => {
    //     getCategoryData()
    //         .then(res => {
    //             console.log("응답 데이터:", res.data);
    //         })
    //         .catch(err => {
    //             console.error("API 에러:", err);
    //         });
    // }, []);


    const [data, dispatch] = useReducer(reducer, mockData);

    // //장부 추가 
    const onCreate = (tradeType, tradeDate, assetType, quantityG, tradeAmount, content) => {
        dispatch({
            type: "CREATE",
            data: {
                tradeType,
                tradeDate,
                assetType,
                quantityG,
                tradeAmount,
                content,
            },
        })
    }

    //삭제
    const onDelete = (seq) => {
        dispatch({
            type: "DELETE",
            seq
        })
    }

    return (
        <>
            <AssetProvider>
                <GoldTrackerStateContext.Provider value={data}>
                    <GoldTrackerDispatchContext.Provider value={{ onDelete, onCreate }}>
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
