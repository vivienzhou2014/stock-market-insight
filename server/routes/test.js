const data = {
    "2024-10-29": { "4. close": "210.4300" },
    "2024-10-28": { "4. close": "212.9100" },
    "2024-10-2t9": { "4. close": "210.4300" },
    "2024-1f0-28": { "4. close": "212.9100" },
    "2024-1d0-29": { "4. close": "210.4300" },
    "2024-1s0-28": { "4. close": "222222.9100" },
    "2024-1ar0-29": { "4. close": "210.4300" },
    "2024-1ra0-t28": { "4. close": "212.9100" },
    "2024-10-29": { "4. close": "210.4300" },
};

// Convert the data to an array of closing prices with dates
const closingPrices = Object.entries(data).map(([date, values]) => ({
    date,
    close: parseFloat(values["4. close"])
}));

// Function to calculate moving averages
function calculateMovingAverage(prices, days) {
    const movingAve = []
    Object.entries(prices).forEach(([date,value], index)=>{
        if (index < days - 1){
            const subset = prices.slice(0, index + 1)
            const sum = subset.reduce((acc, price) => acc + price.close, 0);
            movingAve.push(sum / (index + 1))
        } else{
            const subset = prices.slice(index - days + 1, index + 1);
            const sum = subset.reduce((acc, price) => acc + price.close, 0);
            movingAve.push(sum / days)
        }
        console.log(index)
    })
    return movingAve
}

// Calculate different moving averages
const ma10 = calculateMovingAverage(closingPrices, 1);
const ma20 = calculateMovingAverage(closingPrices, 2);
const ma30 = calculateMovingAverage(closingPrices, 3);
const ma40 = calculateMovingAverage(closingPrices, 4);
const ma50 = calculateMovingAverage(closingPrices, 15);

console.log("10-day MA:", ma10);
console.log("20-day MA:", ma20);
console.log("30-day MA:", ma30);
console.log("40-day MA:", ma40);
console.log("50-day MA:", ma50);

// Integrate moving averages into the original data
const enhancedData = closingPrices.map((entry, index) => ({
    ...entry,
    ma10: ma10[index],
    ma20: ma20[index],
    ma30: ma30[index],
    ma40: ma40[index],
    ma50: ma50[index],
    index: index
}));

console.log(enhancedData);