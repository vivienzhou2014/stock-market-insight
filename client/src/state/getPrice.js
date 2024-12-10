import axios from 'axios';


export const stockDataFetcher = async () => {
    try {
    const response = await axios.get('/api/stock-data'); 
    return response.data;
    } catch (error) {
    console.error('Error fetching data:', error);
    }
};

