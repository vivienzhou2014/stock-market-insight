// Function to analyze moving averages and generate signals
function technicalAnalysis(stockData) {
    const len = stockData.length;

    if (len < 55) {
        return "Not enough data for analysis.";
    }

    // Helper function to check if two arrays are crossing or converging
    function isCrossingOrConverging(maShort, maLong) {
        const lastShort = maShort[len - 1];
        const prevShort = maShort[len - 2];
        const lastLong = maLong[len - 1];
        const prevLong = maLong[len - 2];

        // Check if the short-term MA is crossing or converging with the long-term MA
        return (lastShort > lastLong && prevShort <= prevLong) || Math.abs(lastShort - lastLong) < Math.abs(prevShort - prevLong);
    }

    let signal = "Hold";

    // Check if the 10, 20, and 40-day moving averages are crossing or converging during a downtrend
    if (
        stockData[len - 1].ma10 && stockData[len - 1].ma20 && stockData[len - 1].ma40 &&
        isCrossingOrConverging(stockData.map(item => item.ma10), stockData.map(item => item.ma20)) &&
        isCrossingOrConverging(stockData.map(item => item.ma20), stockData.map(item => item.ma40))
    ) {
        signal = "Buy: Moving averages are converging.";
    }

    // Check if the price has broken below the 55-day moving average
    if (stockData[len - 1].close < stockData[len - 1].ma55) {
        signal = "Sell: Price broke below the 55-day moving average.";
    }

    // Check if the 30-day moving average is flattening and turning upward
    const lastMa30 = stockData[len - 1].ma30;
    const prevMa30 = stockData[len - 2].ma30;

    if (
        lastMa30 && prevMa30 &&
        lastMa30 > prevMa30 && 
        Math.abs(lastMa30 - prevMa30) < Math.abs(prevMa30 - stockData[len - 3].ma30)
    ) {
        signal = "Buy: The 30-day moving average is flattening and turning upward.";
    }

    return signal;
}

function detectReversalPattern(stockData) {
    const stockPrices = stockData.map(item => item.close); // Extract 'close' prices
    const len = stockPrices.length;

    if (len < 55) {
        return "Not enough data for analysis.";
    }

    // Detect Head and Shoulders pattern
    function isHeadAndShoulders() {
        if (len < 5) return false;
        const [p1, p2, p3, p4, p5] = stockPrices.slice(-5); // Last 5 points

        // Check for head and shoulders pattern: shoulder-head-shoulder structure
        return p2 > p1 && p2 > p3 && p4 > p3 && p4 > p5 && p3 < p1 && p3 < p5;
    }

    // Detect Double Top pattern
    function isDoubleTop() {
        if (len < 4) return false;
        const [p1, p2, p3, p4] = stockPrices.slice(-4); // Last 4 points

        // Check for double top: two peaks with a dip in between
        return p1 < p2 && p3 < p2 && Math.abs(p2 - p4) < 0.01; // Peaks at similar levels
    }

    // Detect Double Bottom pattern
    function isDoubleBottom() {
        if (len < 4) return false;
        const [p1, p2, p3, p4] = stockPrices.slice(-4); // Last 4 points

        // Check for double bottom: two troughs with a peak in between
        return p1 > p2 && p3 > p2 && Math.abs(p2 - p4) < 0.01; // Troughs at similar levels
    }

    // Detect Triangle breakout pattern (Symmetrical)
    function isTriangleBreakout() {
        if (len < 6) return false;
        const recentPrices = stockPrices.slice(-6); // Last 6 points

        const maxPrice = Math.max(...recentPrices);
        const minPrice = Math.min(...recentPrices);

        // Check if prices are converging into a triangle shape
        return maxPrice - minPrice < maxPrice * 0.05; // Prices converging within a small range
    }

    if (isHeadAndShoulders()) {
        return "Head and Shoulders pattern detected.";
    } else if (isDoubleTop()) {
        return "Double Top pattern detected.";
    } else if (isDoubleBottom()) {
        return "Double Bottom pattern detected.";
    } else if (isTriangleBreakout()) {
        return "Triangle breakout pattern detected.";
    } else {
        return "No technical pattern detected.";
    }
}

// analysis.js

export function analyzeStock(stockData) {
    const patternResult = detectReversalPattern(stockData);
    const signalResult = technicalAnalysis(stockData);

    return {
        pattern: patternResult,
        signal: signalResult,
    };
}


