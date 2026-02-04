import api from "./api";

const GOLD_BASE = "/api/asset";

export const getCategoryData = () => api.get(`${GOLD_BASE}/categoryValue`);
export const getTradeAvailable = () => api.get(`${GOLD_BASE}/available`);
