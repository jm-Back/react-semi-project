export function findNearestPrice(dateStr, priceMap) {
    const target = new Date(dateStr).getTime();

    const priceEntries = Object.entries(priceMap)
        .map(([k, v]) => [new Date(k).getTime(), v])
        .sort((a, b) => a[0] - b[0]);

    let lastPrice;

    for (const [time, price] of priceEntries) {
        if (time > target) break;
        lastPrice = price;
    }

    return lastPrice;
}
