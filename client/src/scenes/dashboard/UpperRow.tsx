import React, { useEffect, useState } from "react";
import StyledDashboardBox from "../../components/StyleDashboardBox";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button, TextField, useTheme } from "@mui/material";
import axios from "axios";
import "../../index.css";
import { analyzeStock } from "../predictions/technical";
import {getOverallPrediction} from "../predictions/overallPrediction"

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

const UpperRow = () => {
  const { palette } = useTheme();
  const [symbol, setSymbol] = useState("SPY");
  const [chartData, setChartData] = useState<StockData[]>([]);
  const [descriptions, setDescriptions] = useState("");
  const [technicalAnalysisResult, setTechnicalAnalysisResult] = useState("");
  const [overallPrediction, setOverallPrediction] = useState("");

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

  // Handle technical analysis
  const handleAnalyze = () => {
    const result = analyzeStock(chartData);
    setTechnicalAnalysisResult(result.signal); // Store technical analysis result
    console.log("Technical Analysis Result:", result.signal);
  };

  // Fetch sentiment analysis data
  const fetchSentimentAnalysis = async () => {
    try {
      const result = await axios.get(`http://localhost:9000/api/descriptions?symbol=${symbol}`);
      console.log("🚀 ~ fetchData ~ data.descriptions:", result.data);
      setDescriptions(result.data);
    } catch (error) {
      console.error("Error fetching descriptions:", error);
    }
  };

  // Combine technical and sentiment analysis for overall prediction
  const handleGetPrediction = () => {
    getOverallPrediction(technicalAnalysisResult, descriptions, setOverallPrediction);
  };

  // Get lowest and highest prices for Y-axis domain
  const lowestPrice = Math.min(...chartData.map((data) => data.low));
  const highestPrice = Math.max(
    ...chartData.map((data) => data.low + data.change)
  );

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <>
      {/* Stock Price Chart */}
      <StyledDashboardBox gridArea="a">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              domain={[lowestPrice * 0.95, highestPrice * 1.05]}
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              allowDataOverflow={true}
            />
            <Tooltip />
            <Legend />
            {/* Bar for 'low' with transparency */}
            <Bar dataKey="low" fill="#6fb9ab" stackId="a" fillOpacity={0} />
            {/* Bar for 'change' with conditional color */}
            <Bar dataKey="change" stackId="a">
              {chartData.map((entry) => (
                <Cell fill={entry.increase ? "#7fcc76" : "#c47276"} />
              ))}
            </Bar>
            {/* Moving Averages */}
            <Line  dataKey="ma10" stroke="#6fb98e" dot={false} />
            <Line type="monotone" dataKey="ma20" stroke="#6f93b9" dot={false} />
            <Line type="monotone" dataKey="ma30" stroke="#b9a56f" dot={false} />
            <Line type="monotone" dataKey="ma40" stroke="#ad6fb9" dot={false} />
            <Line type="monotone" dataKey="ma55" stroke="#b96f7c" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </StyledDashboardBox>

      {/* Stock Symbol Input and Button */}
      <StyledDashboardBox gridArea="b">
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
            style={{ color: "white", marginTop: "10px" }}
          >
            Get Stock Price Chart
          </Button>
        </div>
      </StyledDashboardBox>

      {/* Analysis Buttons */}
      <StyledDashboardBox gridArea="c">
      <TextField
            id="outlined-multiline-static"
            label="Technical Analysis Result"
            value={`Technical Analysis Result: ${technicalAnalysisResult}`}
            InputLabelProps={{ style: { color: "white" } }} // White label text
            InputProps={{
              readOnly: true,
              style: {
                color: "white",
                borderColor: "GrayText",
                backgroundColor: "#3d544f",
              }, // White text and dark background
            }}
            multiline
            rows={5}
            fullWidth
          />
        <Button
          onClick={handleAnalyze}
          style={{ marginTop: "30px", color: "white" }}
        >
          Get Technical Analysis
        </Button>
        <Button
          onClick={fetchSentimentAnalysis}
          style={{ marginTop: "20px", color: "white" }}
        >
          Get Sentiment Analysis
        </Button>
        <Button
          onClick={handleGetPrediction}
          style={{ marginTop: "20px", color: "white" }}
        >
          Get Overall Prediction
        </Button>




      </StyledDashboardBox>

      {/* Sentiment Analysis Result */}
      <StyledDashboardBox gridArea="d">
        <TextField
          id="outlined-multiline-static"
          label="Sentiment Analysis Result"
          value={descriptions}
          InputLabelProps={{ style: { color: "white" } }} // White label text
          InputProps={{
            readOnly: true,
            style: {
              color: "white",
              borderColor: "GrayText",
              backgroundColor: "#3d544f",
            }, // White text and dark background
          }}
          multiline
          rows={5}
          fullWidth
        />
        
      </StyledDashboardBox>

      {/* Overall Prediction Result */}
      <StyledDashboardBox gridArea="e">
        <TextField
          id="outlined-multiline-static"
          label="Overall Prediction"
          value={overallPrediction}
          InputLabelProps={{ style: { color: "white" } }} // White label text
          InputProps={{
            readOnly: true,
            style: {
              color: "white",
              borderColor: "GrayText",
              backgroundColor: "#3d544f",
            }, // White text and dark background
          }}
          multiline
          rows={5}
          fullWidth
        />
      </StyledDashboardBox>
    </>
  );
};

export default UpperRow;
