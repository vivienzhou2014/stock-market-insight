import fetch from 'node-fetch';
import dotenv from 'dotenv';
import express from 'express';
import { prices } from '../data/price_sample.js';

dotenv.config();
const router = express.Router();

function calculateMovingAverage(prices, days) {
    const movingAve = []
    Object.entries(prices).forEach(([date,value], index)=>{
        if (index < days - 1){
            const subset = prices.slice(0, index + 1)
            const sum = subset.reduce((acc, price) => acc + parseFloat(price.close), 0);
            movingAve.push(Math.round(sum / (index + 1),2))
        } else{
            const subset = prices.slice(index - days + 1, index + 1);
            const sum = subset.reduce((acc, price) => acc + parseFloat(price.close), 0);
            movingAve.push(Math.round(sum / days, 2))
        }
    })
    return movingAve
}

router.get('/stock-data', async (req, res) => {
    try {
      //REMOVE THIS COMMENT OUT WHEN WE NEED THE APP TO ACTUALLY WORK!!!!!
      const symbol = req.query.symbol ; // Default to SPY if no symbol is provided
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.STOCK_PRICE_KEY}`;
  
      const response = await fetch(url);
      
      const data = await response.json();

      // //USING SAMPLE DATA TO AVOID TOO MANY API CALL!!!!!!!!!!!!!!!!!!!!!!!!
      // const data = prices
  
      if (data) {

        const closingPrices = Object.entries(data['Time Series (Daily)']).map(([date, values]) => ({
          date,
          close: Math.round(values['4. close'],2),
          low: Math.round(parseFloat(values['4. close']) < parseFloat(values['1. open']) ? values['4. close'] : values['1. open'], 2),
          change: Math.round(Math.abs(parseFloat(values['4. close']) - parseFloat(values['1. open'])),2),
          increase: parseFloat(values['4. close']) > parseFloat(values['1. open']),
        })).reverse();
        // .slice(0, 30); // Limit to the last 30 entries

        const ma10 = calculateMovingAverage(closingPrices, 10);
        const ma20 = calculateMovingAverage(closingPrices, 20);
        const ma30 = calculateMovingAverage(closingPrices, 30);
        const ma40 = calculateMovingAverage(closingPrices, 40);
        const ma55 = calculateMovingAverage(closingPrices, 55);

        const enhancedData = closingPrices.map((entry, index) => ({
            ...entry,
            ma10: ma10[index],
            ma20: ma20[index],
            ma30: ma30[index],
            ma40: ma40[index],
            ma55: ma55[index],
        }));

        res.json(enhancedData);
      } else {
        res.status(500).json({ error: 'Failed to retrieve stock data' });
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  export default router;