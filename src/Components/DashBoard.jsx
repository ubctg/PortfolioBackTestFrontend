import { useState, useEffect } from "react";
import MonthTabs from "./MonthTab";
import PieChartComponent from "./PieChartComponent";
import LineChartComponent from "./YearlyLineGraph";
import AdditionalInfo from "./AdditionalInfo";
import Button from "react-bootstrap/esm/Button";
import Ratios from "./Ratios";
import './borderDraw.css'
import StockTable from "./StockTable";
import ReturnsModal from "./ReturnsModal"
import EngineWait from "./EngineWait"

export default function DashBoard({startDate = "2020-03-01", endDate = "2020-12-01", startingBalance = 10000.0}){
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const [showGranularLineGraphModal, setShowGranularLineGraphModal] = useState(false)
    const [returnsData, setReturnsData] = useState({})
    const [showRatiosTooltip, setShowRatiosTooltip] = useState(false)

    // Fetch main backtest data on component mount
    useEffect(() => {
        const fetchBacktestData = async () => {
            try {
                setLoading(true);
                const dataUrl = process.env.REACT_APP_API_URL + '/data';
                
                const response = await fetch(dataUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const jsonData = await response.json();
                console.log('Backtest data received:', jsonData);

                setBalanceData(jsonData.balance_history);
                setEsData(jsonData.es_history);
                setAllocationsData(jsonData.stock_history);
                setSpData(jsonData.s_p);
                setRatios({
                    information: jsonData.information_ratio,
                    trenor: jsonData.treynor_ratio,
                    sharpe: jsonData.sharpe_ratio
                });
                setLoading(false);

            } catch (error) {
                console.error('Error fetching backtest data:', error);
                setError(error.message);
                setLoading(false);
                alert('Error fetching backtest data: Please try again or contact UBCTG Quant Division. \n' + error);
            }
        };

        fetchBacktestData();
    }, [startDate, endDate, startingBalance]);

    // Show EngineWait component while loading or if there's an error
    if (loading || error) {
        return <EngineWait setLanding={() => {}} dataRec={!loading && !error} error={error !== null} />;
    }

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
                        <div style={{position: 'relative', display: 'inline-block'}}>
                            <Button
                                style={{margin: 7, width: 150}}
                                variant="outline-light"
                                onMouseEnter={() => setShowRatiosTooltip(true)}
                                onMouseLeave={() => setShowRatiosTooltip(false)}
                            >
                                Ratio Metrics
                            </Button>
                            {showRatiosTooltip && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '110%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'rgba(30,30,30,0.95)',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                    zIndex: 1000,
                                    minWidth: '220px'
                                }}>
                                    <Ratios information={ratios.information} trenor={ratios.trenor} sharpe={ratios.sharpe}/>
                                </div>
                            )}
                        </div>
                        <Button onClick={() => setShowGranularLineGraphModal(true)} style={{margin: 7, width: 150}} variant="outline-light" > Granular Stocks</Button>
                    </div>
                    <ReturnsModal 
                        stockData={returnsData} 
                        showModal={showGranularLineGraphModal} 
                        onClose={() => setShowGranularLineGraphModal(false)}
                        allocations={data.tableData}
                        balance={balanceData[monthsMap[selectedMonth]]}
                        selectedMonth={selectedMonth}/>
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
