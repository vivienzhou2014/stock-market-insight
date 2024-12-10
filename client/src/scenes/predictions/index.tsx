import React, { useMemo, useState } from "react";
import axios from "axios";
import StyledDashboardBox from "../../components/StyleDashboardBox";
import StyledFlexBetween from "../../components/StyledFlexBetween";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import regression, {DataPoint} from 'regression'

type Props = {};
interface StockData {
  date: string;
  low: number;
  change: number;
  close: number;
  increase: boolean;
  ma10?: number;
  ma20?: number;
  ma30?: number;
  ma40?: number;
  ma55?: number;
}

const Predictions = (props: Props) => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const [symbol, setSymbol] = useState("SPY");
  const [chartData, setChartData] = useState<StockData[]>([]);

    // Fetch stock price data
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/stock-data?symbol=${symbol}`
        );
        const closingPrices = response.data;
        console.log("🚀 ~ fetchStockData ~ closingPrices:", closingPrices);
  
        setChartData(closingPrices);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

      // Get lowest and highest prices for Y-axis domain
  const lowestPrice = Math.min(...chartData.map((data) => data.low));
  const highestPrice = Math.max(
    ...chartData.map((data) => data.low + data.change)
  );

  const formattedData = useMemo(()=>{
    if (!chartData) return []
    const formatted: Array<DataPoint> = chartData.map(
      ({close}, i:number) =>{
        return[i, close]
      }
    )
    const regressionLine = regression.linear(formatted)
    return chartData.map(({date, close}, i:number)=>{
      return{
        name:date,
        "Actual Price": close,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Price": regressionLine.predict(i+30)[1]
      }
    })
  },[chartData])

  return (
    <StyledDashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <StyledFlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Price and Predictions</Typography>
          <Typography variant="h6">
            charted price and predicted price based on a simple linear regression model
          </Typography>
        </Box>
        <Button 
        onClick={()=> setIsPredictions(!isPredictions)}
        sx={{
            color:palette.grey[900],
            bgcolor:palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)"
        }}
        style={{ color: "white"}}
        >
            Show Predicted Price for Next Month
        </Button>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="stock symbol here"
            style={{
              padding: "10px",
              borderRadius: "25px",
              
              border: "2px solid #ccc",
              outline: "none",
              width: "200px",
            }}
            
          />
        </div>
        <div>
          <Button
            onClick={fetchStockData}
            style={{ color: "white"}}
            sx={{bgcolor:palette.grey[700],}}
          >
            Get Stock Price Chart
          </Button>
        </div>
      </StyledFlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Date" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[lowestPrice, highestPrice]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label
              value="Stock Price"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Price"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />
          {isPredictions && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Price"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </StyledDashboardBox>
  );
};

export default Predictions;
