import Table from "react-bootstrap/Table";
import React, { useState } from "react";

export default function StockTable({ data }) {
	return (
		<>
			<h3
				style={{
					color: "#e0e0e0",
					textAlign: "left",
					marginBottom: "20px",
					fontSize: "1.2rem",
					borderLeft: "4px solid #4255ff",
					paddingLeft: "10px",
				}}
			>
				Asset Allocation
			</h3>
			<Table striped bordered hover size="sm" variant="dark" responsive="lg">
				<thead>
					<tr>
						<th>Permno</th>
						<th>Ticker</th>
						<th>Weight</th>
						<th>Returns</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(data).map(([name, value], index) => (
						<tr>
							<td>{name}</td>
							<td>{value["Ticker"]}</td>
							<td>{value["Weight"].toFixed(2)}</td>
							<td>{value["Returns"].toFixed(3)}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}
