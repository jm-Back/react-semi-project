import './App.css'

import { createContext, useReducer, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AssetProvider } from "./context/AssetContext";
import { GoldTrackerDispatchContext } from "./context/GoldTrackerDispatchContext"
import { reducer } from "./context/reducer";

import Home from './pages/Home';

//백엔드
import { getTradeList } from "./api/tradeApi/"

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
