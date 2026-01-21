import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./Components/DashBoard";
import Landing from "./Components/Landing";
import BacktestConfig from "./Components/BacktestConfig";

function App() {
	// 'landing' | 'config' | 'dashboard'
	const [view, setView] = useState("landing");

	// Configuration for the backtest
	const [backtestConfig, setBacktestConfig] = useState({
		startDate: "2020-03-01",
		endDate: "2020-12-01",
		startingBalance: 10000.0,
	});

	const handleRunBacktest = (newConfig) => {
		setBacktestConfig(newConfig);
		setView("dashboard");
	};

	return (
		<>
			{view === "landing" && <Landing dashClicked={() => setView("config")} />}

			{view === "config" && (
				<BacktestConfig
					onRun={handleRunBacktest}
					onBack={() => setView("landing")}
				/>
			)}

			{view === "dashboard" && (
				<DashBoard
					startDate={backtestConfig.startDate}
					endDate={backtestConfig.endDate}
					startingBalance={backtestConfig.startingBalance}
				/>
			)}
		</>
	);
}

export default App;
