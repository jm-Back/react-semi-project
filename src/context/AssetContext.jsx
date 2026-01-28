import { createContext, useState, useContext, useEffect } from "react";

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
    const [assets, setAssets] = useState([]); // 모든 자산 목록

    // 자산 업데이트 (매입/매도 후 호출)
    const updateAssets = (newAssets) => setAssets(newAssets);

    // 타입별 보유량 계산 함수
    const getAvailableQuantity = (assetType) => {
        return assets
            .filter(a => a.asset_type === assetType)
            .reduce((sum, a) => sum + Number(a.remaining_quantity_g), 0);
    };

    return (
        <AssetContext.Provider value={{ assets, updateAssets, getAvailableQuantity }}>
            {children}
        </AssetContext.Provider>
    );
};

// 훅으로 편하게 사용
export const useAssets = () => useContext(AssetContext);
