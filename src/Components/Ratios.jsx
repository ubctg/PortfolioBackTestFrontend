import React from "react";

export default function Ratios({ information = 0, trenor = 0, sharpe = 0 }) {
	const ratios = [
		{ name: "Information Ratio", value: information, color: "#8884d8" },
		{ name: "Treynor Ratio", value: trenor, color: "#82ca9d" },
		{ name: "Sharpe Ratio", value: sharpe, color: "#ffc658" },
	];

	return (
		<div style={{ width: "100%", color: "white" }}>
			<div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
				{ratios.map((ratio) => (
					<div
						key={ratio.name}
						style={{
							backgroundColor: "#2a2a2a",
							padding: "10px 15px",
							borderRadius: "6px",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<span style={{ fontSize: "0.9rem", color: "#aaa" }}>
							{ratio.name}
						</span>
						<span
							style={{ fontSize: "1.2rem", fontWeight: "bold", color: "white" }}
						>
							{ratio.value.toFixed(2)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
