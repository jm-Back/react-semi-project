import './App.css'

import { createContext, useReducer, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { GoldTrackerDispatchContext } from "./context/GoldTrackerDispatchContext"
import { AssetRefreshContext } from "./context/AssetRefreshContext";
import AssetSummaryProvider from "./context/AssetSummaryProvider";

import { reducer } from "./context/reducer";
import Home from './pages/Home';

//백엔드
import { getTradeList, saveTradeBuy, saveTradeSell } from "./api/tradeApi/"

export const GoldTrackerStateContext = createContext();

function App() {
    //전체 자산 (total tradeList)
    const [data, dispatch] = useReducer(reducer, []);

    //자산 api 재조회 신호 
    const [assetVersion, setAssetVersion] = useState(0);
    const bumpAssetVersion = () => {
        setAssetVersion(v => v + 1);
    };

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
    }, [assetVersion]);



    //장부 추가 
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
            bumpAssetVersion(); //자산 재조회 
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
            bumpAssetVersion(); //자산 재조회
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
        });
        bumpAssetVersion(); //자산 재조회 
    }

    return (
        <>
            <AssetRefreshContext.Provider value={{ assetVersion, bumpAssetVersion }}>
                <GoldTrackerStateContext.Provider value={data}>
                    <GoldTrackerDispatchContext.Provider value={{ onDelete, onCreateBuy, onCreateSell }}>
                        <AssetSummaryProvider>
                            <Routes>
                                <Route path='/' element={<Home />}></Route>
                            </Routes>
                        </AssetSummaryProvider>
                    </GoldTrackerDispatchContext.Provider>
                </GoldTrackerStateContext.Provider>
            </AssetRefreshContext.Provider>
        </>

    )
}

export default App
