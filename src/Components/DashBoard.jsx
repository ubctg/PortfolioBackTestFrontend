import { useState, useEffect } from "react";
import MonthTabs from "./MonthTab";
import PieChartComponent from "./PieChartComponent";
import LineChartComponent from "./YearlyLineGraph";
import AdditionalInfo from "./AdditionalInfo";
import Button from "react-bootstrap/esm/Button";
import Ratios from "./Ratios";
import './borderDraw.css'
import StockTable from "./StockTable";
import GranularLineGraph from "./GranularLineGraph";
import ReturnsModal from "./ReturnsModal"

export default function DashBoard({jsonData}){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthsMap = {
                        "Jan": 0,
                        "Feb": 1,
                        "Mar": 2,
                        "Apr": 3,
                        "May": 4,
                        "Jun": 5,
                        "Jul": 6,
                        "Aug": 7,
                        "Sep": 8,
                        "Oct": 9,
                        "Nov": 10,
                        "Dec": 11,
                    };
    
    // This is the data for all months
    // We will need to change this using Redux, make it less messy
    const [selectedMonth, setSelectedMonth] = useState("Jan");
    const [balanceData, setBalanceData] = useState([]);
    const [esData, setEsData] = useState([]);
    const [allocationsData, setAllocationsData] = useState([]);
    const [spData, setSpData] = useState([])
    const [ratios, setRatios] = useState({
        information: 0,
        trenor: 0,
        sharpe: 0
    })

    // This is the data for the specific month chosen
    const [data, setData] = useState(
        {
            pieData: [],
            lineData: [],
            tableData: [],
            balance: 0,
            shortfall: 0
        });

    const [monthChosen, setMonthChosen] = useState(false);
    const handleTabSwitch = e => {
        setMonthChosen(true)
        setSelectedMonth(e);
        setData({pieData: allocationsData[monthsMap[e]], tableData: allocationsData[monthsMap[e]], balance: balanceData[monthsMap[e]], shortfall: esData[monthsMap[e]]});
    }

    const [showModal, setShowModal] = useState(false)
    const [returnsData, setReturnsData] = useState()
    useEffect(() => {
        // Will need to fix this json object -> very messy 
        setBalanceData(jsonData[0]);
        setEsData(jsonData[1]);
        setAllocationsData(jsonData[2]);
        setSpData(jsonData[3]);
        setRatios({information: jsonData[4], trenor: jsonData[5], sharpe: jsonData[6]})
        

    }, []);
    useEffect(() => {
        var month = monthsMap[selectedMonth] + 1
        month = month < 10? '0' + month : month
        const returnsUrl = process.env.REACT_APP_API_URL + `/returns?start_date=2022-${month}-01&end_date=2022-${month}-31`;
        console.log(returnsUrl)
        fetch(returnsUrl)
        .then(response => response.json())
        .then(jsonData => {
          setReturnsData(jsonData);
        })
        .catch(error => {
          alert('Error fetching returns: Please try again or contact UBCTG Quant Division. \n' + error);        
        });
    }, [selectedMonth])
    return (
        <div style={{ backgroundColor: "black" }}>
            {
                monthChosen && 
                <>
                <img src="logo.png" alt="Logo" style={{ width: 200 , position: "absolute"}} />
                    <div style={{ display: "flex", textAlign: "center", justifyContent: "center", alignContent: "center", flexDirection: "column", height: 125}}>
                        <h1 style={{fontFamily: "Arial Arabic", animation: "borderDraw 5s forwards"}}>DASHBOARD</h1>
                    </div>
                    <hr style={{
                        border: 50,height: 2,
                        backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 1.0), rgba(0, 0, 0, 0))"}} 
                    />
                    <MonthTabs months={months} handleTabSwitch={handleTabSwitch} /> 

                    <div className="cont" style={{width: "100%"}}>
                        <div className="box">
                            <LineChartComponent balanceHistory={balanceData} spData={spData} months={months}/>
                        </div>
                        <div className="box">
                            <StockTable data = {data.tableData}/>
                        </div>
                        <div className="box">
                            {balanceData.length > 0 && <PieChartComponent pieData={data.pieData} /> }
                        </div>
                        <div className="box">
                            <AdditionalInfo balance={data.balance.toFixed(2)} shortfall={data.shortfall.toFixed(2)}/>   
                        </div>
                    </div>    
                    <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                        <Button style={{margin: 7, width: 150}} variant="outline-light" > S&P Regression Info</Button>
                        <Button style={{margin: 7, width: 150}} variant="outline-light" > Sector Regression Info</Button>
                        <Button onClick={() => setShowModal(true)} style={{margin: 7, width: 150}} variant="outline-light" > Stock Data</Button>
                    </div>
                    <ReturnsModal 
                        stockData={returnsData} 
                        showModal={showModal} 
                        onClose={() => setShowModal(false)}
                        allocations={data.tableData}
                        balance={balanceData[monthsMap[selectedMonth]]}/>
                </>
            }
            {
                !monthChosen && 
                <div style={{position: "absolute", backgroundColor: "black", width: "100%", height: "100%", paddingTop: -10}}>
                <img src="logo.png" style = {{width: 200}} />
                <div style={{textAlign: "center"}}>
                    <h2 style={{color: "#892736", padding: 100}}>Please Choose A Month</h2>
                    {months.map(x => <Button key={x} style={{margin: 7, width: 150}} variant = "outline-light" onClick={() => handleTabSwitch(x)}>{x}</Button>)}
                </div>
                </div>
            }
        </div>
    );
    
}