import './App.css'

import { createContext, useReducer, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AssetProvider } from "./context/AssetContext";
import { GoldTrackerDispatchContext } from "./context/GoldTrackerDispatchContext"
import { reducer } from "./context/reducer";

import Home from './pages/Home';

//백엔드
import { getTradeList, saveTradeBuy, saveTradeSell } from "./api/tradeApi/"

export const GoldTrackerStateContext = createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        getTradeList({
            year: 0,
            month: 0,
        })
            .then(res => {
                dispatch({
                    type: "INIT",
                    data: res.data,
                });
            })
            .catch(console.error);
    }, []);

    // //장부 추가 
    const onCreateBuy = async (tradeType, tradeDate, assetType, quantityG, tradeAmount, content) => {
        try {
            const res = await saveTradeBuy({
                tradeType,
                tradeDate,
                assetType,
                quantityG,
                tradeAmount,
                content,
            });

            dispatch({
                type: "CREATE",
                data: res.data,
            });
        } catch (e) {
            console.error(e);
            alert("저장 실패");
        }
    }

    const onCreateSell = async (seq, tradeDate, tradeType, tradeAmount, content) => {
        try {
            const res = await saveTradeSell({ seq, tradeDate, tradeType, tradeAmount, content });

            console.log(res);
            dispatch({
                type: "CREATE",
                data: res.data,
            });
        } catch (e) {
            console.error(e);
            alert("저장 실패");
        }
    };

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
                    <GoldTrackerDispatchContext.Provider value={{ onDelete, onCreateBuy, onCreateSell }}>
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
