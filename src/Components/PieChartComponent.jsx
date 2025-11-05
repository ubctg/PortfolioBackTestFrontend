import React, { PureComponent, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';



export default function PieChartComponent({pieData}) {
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  const RADIAN = Math.PI / 180;
  const data = Object.entries(pieData).map(([id, { Weight, Ticker }]) => ({
    id,
    name: Ticker,  // Use Ticker as name
    value: Math.abs(Weight),  // We use the absolute value of the weight for the pie chart
    Weight,  // Keep Weight for later use in labels
  }));
  console.log(pieData)

  const COLORS = generateColors(data.length);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {data[index].name} - {(data[index].value*100).toFixed(2)} %
    </text>
  );
};

    return (
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
    );
  
}
