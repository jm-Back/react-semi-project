export const formatNumber = (value) => {
    if (!value) return "";
    return value
        .replace(/,/g, "")          // 기존 콤마 제거
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};