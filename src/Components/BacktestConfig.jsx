import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export default function BacktestConfig({ onRun, onBack }) {
	const [startDate, setStartDate] = useState("2020-03-01");
	const [endDate, setEndDate] = useState("2020-12-01");
	const [startingBalance, setStartingBalance] = useState(10000);

	const handleSubmit = (e) => {
		e.preventDefault();
		onRun({
			startDate,
			endDate,
			startingBalance: parseFloat(startingBalance),
		});
	};

	return (
		<div
			style={{
				backgroundColor: "#121212",
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "white",
			}}
		>
			<Card
				style={{
					width: "100%",
					maxWidth: "500px",
					backgroundColor: "#1e1e1e",
					color: "white",
					border: "1px solid #333",
					boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
				}}
			>
				<Card.Body style={{ padding: "2rem" }}>
					<div style={{ textAlign: "center", marginBottom: "2rem" }}>
						<h2 style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
							Configuration
						</h2>
						<p style={{ color: "#aaa" }}>Set parameters for your backtest</p>
					</div>

					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formStartDate">
							<Form.Label>Start Date</Form.Label>
							<Form.Control
								type="date"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								style={{
									backgroundColor: "#2a2a2a",
									color: "white",
									border: "1px solid #444",
								}}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formEndDate">
							<Form.Label>End Date</Form.Label>
							<Form.Control
								type="date"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								style={{
									backgroundColor: "#2a2a2a",
									color: "white",
									border: "1px solid #444",
								}}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-4" controlId="formBalance">
							<Form.Label>Starting Balance ($)</Form.Label>
							<Form.Control
								type="number"
								value={startingBalance}
								onChange={(e) => setStartingBalance(e.target.value)}
								style={{
									backgroundColor: "#2a2a2a",
									color: "white",
									border: "1px solid #444",
								}}
								min="1000"
								required
							/>
						</Form.Group>

						<div
							style={{
								display: "flex",
								gap: "15px",
								justifyContent: "space-between",
							}}
						>
							<Button
								variant="outline-light"
								onClick={onBack}
								style={{ flex: 1 }}
							>
								Back
							</Button>
							<Button
								variant="primary"
								type="submit"
								style={{
									flex: 2,
									backgroundColor: "#00C49F",
									borderColor: "#00C49F",
									color: "black",
									fontWeight: "bold",
								}}
							>
								Run Backtest
							</Button>
						</div>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
}
