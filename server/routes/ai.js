// Import necessary modules
import express from 'express';
import fetchAndConcatenateDescriptions from './news.js';

const router = express.Router();

router.get('/descriptions', async (req, res) => {
    try {
      const symbol = req.query.symbol ; // Default to SPY if no symbol is provided
      const { concatenatedDescriptions, sentimentAnalysis } = await fetchAndConcatenateDescriptions(symbol);

        if (!concatenatedDescriptions || !sentimentAnalysis) {
            return res.status(500).json({ error: 'Failed to fetch data' });
        }

        res.json(sentimentAnalysis);
      
    } catch (error) {
      console.error('Failed to fetch descriptions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  export default router;