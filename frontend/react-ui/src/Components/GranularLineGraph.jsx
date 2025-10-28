import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function GranularLineGraph({ stockData }) {
  const [visibleStocks, setVisibleStocks] = useState({
    AAPL: true,
    IBM: true,
    MSFT: true,
    TSLA: true
  });

  const handleLegendClick = (e) => {
    const { dataKey } = e;
    setVisibleStocks((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  const prepareData = () => {
    const dates = Array.from({ length: stockData['AAPL'].length }, (_, i) => `Day ${i + 1}`);
    const formattedData = dates.map((date, index) => ({
      date,
      AAPL: stockData['AAPL'][index],
      IBM: stockData['IBM'][index],
      MSFT: stockData['MSFT'][index],
      TSLA: stockData['TSLA'][index],
    }));
    return formattedData;
  };

  const data = prepareData();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend onClick={handleLegendClick} />

        <Line 
          type="monotone" 
          dataKey="AAPL" 
          stroke="#8884d8" 
          strokeWidth={visibleStocks.AAPL ? 2 : 0} 
          dot={false} 
        />
        <Line 
          type="monotone" 
          dataKey="IBM" 
          stroke="#82ca9d" 
          strokeWidth={visibleStocks.IBM ? 2 : 0} 
          dot={false}  
        />
        <Line 
          type="monotone" 
          dataKey="MSFT" 
          stroke="#2a453d"
          strokeWidth={visibleStocks.MSFT ? 2 : 0} 
          dot={false}  
        />
        <Line 
          type="monotone" 
          dataKey="TSLA" 
          stroke="#ff7300" 
          strokeWidth={visibleStocks.TSLA ? 2 : 0} 
          dot={false}  
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
