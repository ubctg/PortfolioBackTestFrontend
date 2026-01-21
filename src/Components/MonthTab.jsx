import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function MonthTabs({ months, handleTabSwitch, activeMonth }) {
	return (
		<div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
			<Tabs
				activeKey={activeMonth}
				id="month-tabs"
				className="mb-3 custom-tabs"
				justify
				onSelect={handleTabSwitch}
				style={{ borderBottom: "1px solid #333" }}
			>
				{months.map((x, index) => (
					<Tab key={index} eventKey={x} title={x} />
				))}
			</Tabs>
			<style>
				{`
                    .custom-tabs .nav-link {
                        color: #888 !important;
                        background-color: transparent !important;
                        border: none !important;
                        border-bottom: 2px solid transparent !important;
                        transition: all 0.3s ease;
                    }
                    .custom-tabs .nav-link:hover {
                        color: #bbb !important;
                        border-color: #444 !important;
                    }
                    .custom-tabs .nav-link.active {
                        color: #fff !important;
                        background-color: transparent !important;
                        border-bottom: 2px solid #00C49F !important;
                        font-weight: bold;
                    }
                `}
			</style>
		</div>
	);
}
