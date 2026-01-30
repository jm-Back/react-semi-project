import api from "./api";

const GOLD_BASE = "/api/gold";

export const getCategoryAssetLotData = () =>
    api.get(`${GOLD_BASE}/categoryData`);
