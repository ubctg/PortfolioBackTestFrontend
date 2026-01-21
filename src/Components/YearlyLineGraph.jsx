import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div
				style={{
					backgroundColor: "rgba(31, 31, 31, 0.95)",
					border: "1px solid #555",
					borderRadius: "4px",
					padding: "10px",
					color: "#fff",
					boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
				}}
			>
				<p
					style={{
						margin: "0 0 5px",
						fontWeight: "bold",
						borderBottom: "1px solid #555",
						paddingBottom: "3px",
					}}
				>
					{label}
				</p>
				{payload.map((entry, index) => (
					<p
						key={index}
						style={{ color: entry.color, margin: "3px 0", fontSize: "0.9em" }}
					>
						<span
							style={{
								display: "inline-block",
								width: "10px",
								height: "10px",
								backgroundColor: entry.color,
								marginRight: "5px",
								borderRadius: "50%",
							}}
						></span>
						{entry.name}:{" "}
						<strong>
							$
							{entry.value.toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</strong>
					</p>
				))}
			</div>
		);
	}
	return null;
};

export default function LineChartComponent({
	balanceHistory,
	spData,
	months,
	onMonthClick,
}) {
	// Guard clause for missing data
	if (!balanceHistory || !spData || !months || balanceHistory.length === 0) {
		return (
			<div
				style={{
					height: "400px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "#ccc",
				}}
			>
				No Data Available
			</div>
		);
	}

	const data = months.map((month, index) => ({
		name: month,
		"Black Litterman": balanceHistory[index],
		"S&P": spData[index],
	}));

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				minHeight: "350px",
			}}
		>
			<ResponsiveContainer width="100%" height={350}>
				<LineChart
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 10,
						bottom: 5,
					}}
					onClick={(e) => {
						if (onMonthClick && e && e.activeLabel) {
							onMonthClick(e.activeLabel);
						}
					}}
				>
					<CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
					<XAxis
						dataKey="name"
						stroke="#888"
						tick={{ fill: "#aaa" }}
						tickLine={false}
						axisLine={{ stroke: "#555" }}
					/>
					<YAxis
						stroke="#888"
						tick={{ fill: "#aaa" }}
						tickLine={false}
						axisLine={{ stroke: "#555" }}
						tickFormatter={(value) =>
							`$${value >= 1000 ? (value / 1000).toFixed(0) + "k" : value}`
						}
						domain={["auto", "auto"]}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Legend veritcalAlign="top" height={36} iconType="circle" />
					<Line
						name="Black Litterman"
						type="monotone"
						dataKey="Black Litterman"
						stroke="#00C49F" // Teal
						strokeWidth={3}
						dot={{ r: 4, strokeWidth: 0, fill: "#00C49F" }}
						activeDot={{ r: 7, strokeWidth: 0 }}
					/>
					<Line
						name="S&P 500"
						type="monotone"
						dataKey="S&P"
						stroke="#FF6B6B" // Soft Red/Orange
						strokeWidth={2}
						dot={{ r: 3, strokeWidth: 0, fill: "#FF6B6B" }}
						activeDot={{ r: 6, strokeWidth: 0 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
