import React from "react";

export default function AdditionalInfo({ balance = 0, shortfall = 0 }) {
	return (
		<div style={{ width: "100%", minWidth: "250px" }}>
			<div
				style={{
					backgroundColor: "#2a2a2a",
					padding: "15px",
					borderRadius: "8px",
					marginBottom: "10px",
					border: "1px solid #333",
				}}
			>
				<h5
					style={{
						color: "#aaa",
						fontSize: "0.9rem",
						marginBottom: "5px",
						textTransform: "uppercase",
						letterSpacing: "1px",
					}}
				>
					Balance
				</h5>
				<h2 style={{ color: "white", margin: 0, fontWeight: "bold" }}>
					$ {balance}
				</h2>
			</div>
			<div
				style={{
					backgroundColor: "#2a2a2a",
					padding: "15px",
					borderRadius: "8px",
					border: "1px solid #333",
				}}
			>
				<h5
					style={{
						color: "#aaa",
						fontSize: "0.9rem",
						marginBottom: "5px",
						textTransform: "uppercase",
						letterSpacing: "1px",
					}}
				>
					Expected Shortfall
				</h5>
				<h2 style={{ color: "white", margin: 0, fontWeight: "bold" }}>
					{shortfall}
				</h2>
			</div>
		</div>
	);
}
