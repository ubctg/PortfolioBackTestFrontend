import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function PieChartComponent({ pieData }) {
	if (!pieData || Object.keys(pieData).length === 0) return null;

	const generateColors = (count) => {
		const colors = [];
		for (let i = 0; i < count; i++) {
			const hue = (i * 137.508) % 360;
			colors.push(`hsl(${hue}, 60%, 55%)`);
		}
		return colors;
	};

	const RADIAN = Math.PI / 180;
	const data = Object.entries(pieData)
		.map(([id, { Weight, Ticker }]) => ({
			id,
			name: Ticker,
			value: Math.abs(Weight),
			originalWeight: Weight,
		}))
		.sort((a, b) => b.value - a.value);

	const COLORS = generateColors(data.length);

	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		if (percent < 0.05) return null;

		const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor="middle"
				dominantBaseline="central"
				style={{
					fontSize: "10px",
					fontWeight: "bold",
					textShadow: "1px 1px 2px black",
				}}
			>
				{data[index].name}
			</text>
		);
	};

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			const d = payload[0].payload;
			return (
				<div
					style={{
						backgroundColor: "#222",
						padding: "10px",
						border: "1px solid #444",
						borderRadius: "4px",
					}}
				>
					<p style={{ margin: 0, fontWeight: "bold", color: "#fff" }}>
						{d.name}
					</p>
					<p style={{ margin: 0, color: "#ccc" }}>
						Allocation: {(d.value * 100).toFixed(2)}%
					</p>
					{d.originalWeight < 0 && (
						<p style={{ margin: 0, color: "#ff6b6b", fontSize: "0.8em" }}>
							(Short Position)
						</p>
					)}
				</div>
			);
		}
		return null;
	};

	return (
		<div style={{ width: "100%", height: "300px", minHeight: "300px" }}>
			<h3
				style={{
					color: "#e0e0e0",
					textAlign: "left",
					marginBottom: "5px",
					fontSize: "1.2rem",
					borderLeft: "4px solid #FF8042",
					paddingLeft: "10px",
				}}
			>
				Asset Allocation
			</h3>
			<ResponsiveContainer width="100%" height="90%">
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={100}
						innerRadius={40}
						dataKey="value"
						startAngle={0}
						endAngle={-360}
						isAnimationActive={true}
						animationDuration={800}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
								stroke="#1e1e1e"
								strokeWidth={2}
							/>
						))}
					</Pie>
					<Tooltip content={<CustomTooltip />} />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
