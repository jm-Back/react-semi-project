import api from "./api";

const GOLD_BASE = "/api/trade";

export const getTradeList = (body) => api.post(`${GOLD_BASE}/dataList`, body);

//buy <-> sell
export const saveTradeBuy = (data) => api.post(`${GOLD_BASE}/buy`, data);
export const saveTradeSell = (data) => api.post(`${GOLD_BASE}/sell`, data);
