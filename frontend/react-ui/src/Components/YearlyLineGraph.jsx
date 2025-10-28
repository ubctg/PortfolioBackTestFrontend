import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



export default function LineChartComponent({balanceHistory, spData, months}) {

  const data = months.map((month, index) => ({
        name: month,
        "Black Litterman": balanceHistory[index], 
        "S&P":  spData[index],
        amt: balanceHistory[index] 
      }));

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Black Litterman"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
          <Line type="monotone" dataKey="S&P" stroke="#FF0000" />

    </LineChart> 
  );
}
