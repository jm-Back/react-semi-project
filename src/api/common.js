import api from "./api";

const GOLD_BASE = "/api/common";

export const getCategorys = () => api.get(`${GOLD_BASE}/category`);
export const getGoldPrices = () => api.get(`${GOLD_BASE}/goldPrice`);
