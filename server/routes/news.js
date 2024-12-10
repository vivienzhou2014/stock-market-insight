// Import the dotenv module
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { news } from '../data/news_sample.js';
import fetch from 'node-fetch';
import express from 'express';

// Configure dotenv
dotenv.config();

const router = express.Router();



// Function to fetch data from the API
async function fetchAndConcatenateDescriptions(symbol) {
    try {

      // Define the API endpoint and your API key
const apiUrl = `https://newsapi.org/v2/everything?q=${`stock `, symbol}&apiKey=${process.env.NEWS_KEY}`;
        // Make the API call
        const response = await fetch(apiUrl);
        
        // Check if the response is OK (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        // Parse the JSON response
        const data = await response.json();
        console.log("news data: "+ data)
        
        // Extract descriptions from articles
        const descriptions = data.articles.map(article => article.description);
        
        // Concatenate all descriptions into a single string
        const concatenatedDescriptions = descriptions.join(' ');
        
        // Output the concatenated descriptions (or send them to another function)
        // console.log(concatenatedDescriptions);

        // Get sentiment analysis from OpenAI
        const sentimentAnalysis = await getResponse(concatenatedDescriptions);

        // Return both concatenated descriptions and sentiment analysis if needed
        return { concatenatedDescriptions, sentimentAnalysis };
        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


async function getResponse(prompt) {
    const perplexity = new OpenAI({
      apiKey: process.env.PERPLEXITY_API_KEY,
      baseURL: 'https://api.perplexity.ai/',
    });
  
    try {
      const response = await perplexity.chat.completions.create({
        model: 'llama-3.1-sonar-huge-128k-online',
        messages: [
          { role: 'system', content: 'You are a financial analyst specialized in sentiment analysis to give suggestions focusing on sentiment analysis with positive or negative report.' },
          { role: 'user', content: "give me sentiment analysis with percentage to buy or sell the stock mentioned in this context:" + prompt }
        ],
        max_tokens: 1000,
      });
  
      return 'Sentiment Analysis Result:' + response.choices[0].message.content
    } catch (error) {
      console.error('Error fetching response:', error.response?.data || error.message);
    }
  }



// Call the function
// fetchAndConcatenateDescriptions();

// const descriptions = news.articles.map(article => article.description);
// const concatenatedDescriptions = descriptions.join();
// getResponse(concatenatedDescriptions)

export default fetchAndConcatenateDescriptions;