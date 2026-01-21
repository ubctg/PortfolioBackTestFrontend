import { useState, useEffect } from "react";
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

export default function GranularLineGraph({ stockData, selectedMonth }) {
	const tickers = Object.keys(stockData || {});
	const [visibleStocks, setVisibleStocks] = useState({});

	useEffect(() => {
		setVisibleStocks(
			tickers.reduce((acc, ticker) => ({ ...acc, [ticker]: true }), {}),
		);
	}, [stockData]);

	const handleLegendClick = (e) => {
		const { dataKey } = e;
		setVisibleStocks((prev) => ({
			...prev,
			[dataKey]: !prev[dataKey],
		}));
	};
	const prepareData = () => {
		if (tickers.length === 0) return [];
		// safe guard if stockData[tickers[0]] is not an array or undefined
		if (!Array.isArray(stockData[tickers[0]])) return [];

		const length = stockData[tickers[0]].length;
		const month = selectedMonth || "Jan";
		const dates = Array.from({ length }, (_, i) => `${month} ${i + 1}`);
		return dates.map((date, index) => {
			const entry = { date };
			tickers.forEach((ticker) => {
				entry[ticker] = (stockData[ticker] || [])[index];
			});
			return entry;
		});
	};

	const data = prepareData();
	const colors = [
		"#8884d8",
		"#82ca9d",
		"#2a453d",
		"#ff7300",
		"#0088FE",
		"#00C49F",
		"#FFBB28",
		"#FF8042",
	];
	const getColor = (idx) => colors[idx % colors.length];

	return (
		<ResponsiveContainer width="100%" height={400}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Legend onClick={handleLegendClick} />
				{tickers.map((ticker, idx) => (
					<Line
						key={ticker}
						type="monotone"
						dataKey={ticker}
						stroke={getColor(idx)}
						strokeWidth={visibleStocks[ticker] !== false ? 2 : 0}
						dot={false}
					/>
				))}
			</LineChart>
		</ResponsiveContainer>
	);
}
