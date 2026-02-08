// context/AssetSummaryProvider.jsx
import { useEffect, useState, useContext } from "react";
import { AssetRefreshContext } from "./AssetRefreshContext"
import { getSummary } from "../api/assetApi";
import { AssetSummaryContext } from "./AssetSummaryContext";

export default function AssetSummaryProvider({ children }) {
    const assetVersion = useContext(AssetRefreshContext);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        getSummary().then(res => setSummary(res.data));
    }, [assetVersion]);

    return (
        <AssetSummaryContext.Provider value={summary}>
            {children}
        </AssetSummaryContext.Provider>
    );
}
