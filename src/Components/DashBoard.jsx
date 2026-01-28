import { useState, useEffect, useMemo } from "react";
import stubbedData from "../stubbed_data.json";
import MonthTabs from "./MonthTab";
import PieChartComponent from "./PieChartComponent";
import LineChartComponent from "./YearlyLineGraph";
import AdditionalInfo from "./AdditionalInfo";
import Button from "react-bootstrap/esm/Button";
import Ratios from "./Ratios";
import "./borderDraw.css";
import StockTable from "./StockTable";
import ReturnsModal from "./ReturnsModal";
import EngineWait from "./EngineWait";

export default function DashBoard({
	startDate = "2020-03-01",
	endDate = "2020-12-01",
	startingBalance = 10000.0,
	debugMode = false,
	onHome,
	onBackToConfig,
}) {
	const months = useMemo(() => {
		if (!startDate || !endDate) return [];
		const start = startDate.split("-").map(Number);
		const end = endDate.split("-").map(Number);
		const labels = [];

		let [currY, currM] = [start[0], start[1]];
		const [endY, endM] = [end[0], end[1]];

		const mNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];

		while (currY < endY || (currY === endY && currM <= endM)) {
			const mName = mNames[currM - 1];
			const yShort = currY.toString().slice(-2);
			labels.push(`${mName} '${yShort}`);

			currM++;
			if (currM > 12) {
				currM = 1;
				currY++;
			}
		}
		return labels;
	}, [startDate, endDate]);

	// This is the data for all months
	const [selectedMonth, setSelectedMonth] = useState(
		months.length > 0 ? months[0] : "",
	);
	const [balanceData, setBalanceData] = useState([]);
	const [esData, setEsData] = useState([]);
	const [allocationsData, setAllocationsData] = useState([]);
	const [spData, setSpData] = useState([]);
	const [ratios, setRatios] = useState({
		information: 0,
		trenor: 0,
		sharpe: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// This is the data for the specific month chosen
	const [data, setData] = useState({
		pieData: [],
		lineData: [],
		tableData: [],
		balance: 0,
		shortfall: 0,
	});

	const [monthChosen, setMonthChosen] = useState(false);
	const [returnsData, setReturnsData] = useState({});
	const [showGranularLineGraphModal, setShowGranularLineGraphModal] =
		useState(false);
	const [showRatiosTooltip, setShowRatiosTooltip] = useState(false);

	const handleTabSwitch = (e) => {
		setMonthChosen(true);
		setSelectedMonth(e);
		const idx = months.indexOf(e);
		const currentData = allocationsData[idx] || {};

		setData({
			pieData: currentData,
			tableData: currentData,
			balance: balanceData[idx] || 0,
			shortfall: esData[idx] || 0,
		});

		const newReturnsData = {};
		if (currentData && typeof currentData === "object") {
			Object.values(currentData).forEach((stock) => {
				if (stock.Ticker && stock.DailyReturns) {
					newReturnsData[stock.Ticker] = stock.DailyReturns;
				}
			});
		}
		setReturnsData(newReturnsData);
	};

	// Auto-select first month when data constitutes
	useEffect(() => {
		if (!monthChosen && allocationsData.length > 0 && balanceData.length > 0) {
			// Instead of calling handleTabSwitch which depends on state content potentially not updated in closure if defined simply,
			// We can just manually call the logic or trust that allocationsData in this scope is updated because of the dependency array.
			// Since we are in useEffect [allocationsData], 'allocationsData' is fresh.

			const startMonth = months[0];
			setMonthChosen(true);
			setSelectedMonth(startMonth);
			const idx = 0;
			const currentData = allocationsData[idx] || {};

			setData({
				pieData: currentData,
				tableData: currentData,
				balance: balanceData[idx] || 0,
				shortfall: esData[idx] || 0,
			});

			const newReturnsData = {};
			if (currentData && typeof currentData === "object") {
				Object.values(currentData).forEach((stock) => {
					if (stock.Ticker && stock.DailyReturns) {
						newReturnsData[stock.Ticker] = stock.DailyReturns;
					}
				});
			}
			setReturnsData(newReturnsData);
		}
	}, [allocationsData, balanceData, monthChosen, months]);

	// Fetch main backtest data on component mount
	useEffect(() => {
		const fetchBacktestData = async () => {
			try {
				setLoading(true);
				setMonthChosen(false);

				if (debugMode) {
					console.log("DEBUG: Using stubbed data");
					setBalanceData(stubbedData.balance_history);
					setEsData(stubbedData.es_history);
					setAllocationsData(stubbedData.stock_history);
					setSpData(stubbedData.s_p);
					setRatios({
						information: stubbedData.information_ratio,
						trenor: stubbedData.treynor_ratio,
						sharpe: stubbedData.sharpe_ratio,
					});
					setLoading(false);
					return;
				}

				const dataUrl = `${process.env.REACT_APP_API_URL}data`;
				const response = await fetch(dataUrl, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						start_date: startDate,
						end_date: endDate,
						starting_balance: startingBalance,
					}),
				});
				if (!response.ok) {
					throw new Error(
						`POST /data failed: ${response.status} ${response.statusText}`,
					);
				}
				const result = await response.json();

				setBalanceData(result.balance_history);
				setEsData(result.es_history);
				setAllocationsData(result.stock_history);
				setSpData(result.s_p);
				setRatios({
					information: result.information_ratio,
					trenor: result.treynor_ratio,
					sharpe: result.sharpe_ratio,
				});

				setLoading(false);
			} catch (error) {
				console.error("Error fetching backtest data:", error);
				setError(error.message);
				setLoading(false);
				alert(
					"Error fetching backtest data: Please try again or contact UBCTG Quant Division. \n" +
						error,
				);
			}
		};

		fetchBacktestData();
	}, [startDate, endDate, startingBalance]);

	// Show EngineWait component while loading or if there's an error
	if (loading || error) {
		return (
			<EngineWait
				setLanding={() => {}}
				dataRec={!loading && !error}
				error={error !== null}
			/>
		);
	}

	return (
		<div
			style={{
				backgroundColor: "#121212",
				minHeight: "100vh",
				color: "white",
				paddingBottom: "50px",
			}}
		>
			<div
				style={{
					padding: "20px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					flexWrap: "wrap",
					borderBottom: "1px solid #333",
				}}
			>
				<div style={{ display: "flex", alignItems: "center" }}>
					<img
						src="logo.png"
						alt="Logo"
						style={{ width: 100, marginRight: "20px" }}
					/>
					<h2
						style={{
							fontFamily: "Arial, sans-serif",
							fontWeight: "bold",
							margin: 0,
							letterSpacing: "2px",
						}}
					>
						DASHBOARD
					</h2>
				</div>
				<div>
					<Button
						variant="outline-light"
						onClick={onBackToConfig}
						style={{ marginRight: "10px" }}
					>
						Backtest Config
					</Button>
					<Button variant="outline-light" onClick={onHome}>
						Home
					</Button>
				</div>
			</div>

			{/* Global Performance Section - Separated from Month Selection */}
			<div
				style={{
					padding: "20px",
					display: "flex",
					flexWrap: "wrap",
					gap: "20px",
					justifyContent: "center",
				}}
			>
				<div
					className="dashboard-card"
					style={{
						backgroundColor: "#1e1e1e",
						padding: "20px",
						borderRadius: "8px",
						flex: "1 1 auto",
						maxWidth: "1000px",
					}}
				>
					<h4
						style={{ marginBottom: "15px", color: "#ddd", textAlign: "center" }}
					>
						Portfolio Performance
					</h4>
					<LineChartComponent
						balanceHistory={balanceData}
						spData={spData}
						months={months}
						onMonthClick={handleTabSwitch}
					/>
				</div>

				<div
					className="dashboard-card"
					style={{
						backgroundColor: "#1e1e1e",
						padding: "20px",
						borderRadius: "8px",
						flex: "0 1 400px",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<h4
						style={{
							marginBottom: "15px",
							textAlign: "center",
							color: "#ddd",
						}}
					>
						Risk Ratios
					</h4>
					<Ratios
						information={ratios.information}
						trenor={ratios.trenor}
						sharpe={ratios.sharpe}
					/>
				</div>
			</div>

			{/* Navigation / Month Selection */}
			<div
				style={{ padding: "20px 0", display: "flex", justifyContent: "center" }}
			>
				<MonthTabs
					months={months}
					handleTabSwitch={handleTabSwitch}
					activeMonth={selectedMonth}
				/>
			</div>

			{monthChosen ? (
				<div
					style={{
						padding: "0 20px",
						display: "flex",
						flexWrap: "wrap",
						gap: "20px",
						justifyContent: "center",
						alignItems: "flex-start",
					}}
				>
					{/* Stock Table */}
					<div
						className="dashboard-card"
						style={{
							backgroundColor: "#1e1e1e",
							padding: "20px",
							borderRadius: "8px",
							overflow: "hidden",
							flex: "1 1 500px",
							maxWidth: "800px",
						}}
					>
						<StockTable data={data.tableData} />
					</div>

					{/* Asset Allocation & Info */}
					<div
						className="dashboard-card"
						style={{
							backgroundColor: "#1e1e1e",
							padding: "20px",
							borderRadius: "8px",
							flex: "1 1 400px",
							display: "flex",
							flexWrap: "wrap",
							gap: "20px",
							justifyContent: "center",
							maxWidth: "800px",
						}}
					>
						<div
							style={{
								flex: "1 1 300px",
								minWidth: "300px",
							}}
						>
							{balanceData.length > 0 ? (
								<PieChartComponent pieData={data.pieData} />
							) : (
								<div
									style={{
										textAlign: "center",
										padding: "50px",
										color: "#666",
									}}
								>
									No Allocation Data
								</div>
							)}
						</div>

						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
								justifyContent: "center",
								flex: "0 0 auto",
							}}
						>
							<AdditionalInfo
								balance={(data.balance || 0).toFixed(2)}
								shortfall={(data.shortfall || 0).toFixed(2)}
							/>
							<Button
								onClick={() => setShowGranularLineGraphModal(true)}
								variant="outline-primary"
								style={{ width: "100%", padding: "10px" }}
							>
								View Granular Stock Returns
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div style={{ textAlign: "center", marginTop: "100px", color: "#666" }}>
					Select a month to view details
				</div>
			)}

			<ReturnsModal
				stockData={returnsData}
				showModal={showGranularLineGraphModal}
				onClose={() => setShowGranularLineGraphModal(false)}
				allocations={data.tableData}
				balance={balanceData[months.indexOf(selectedMonth)]}
				selectedMonth={selectedMonth}
			/>
		</div>
	);
}
