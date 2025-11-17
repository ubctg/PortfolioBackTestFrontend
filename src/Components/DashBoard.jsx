import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MonthTabs from "./MonthTab";
import PieChartComponent from "./PieChartComponent";
import LineChartComponent from "./YearlyLineGraph";
import AdditionalInfo from "./AdditionalInfo";
import Button from "react-bootstrap/esm/Button";
import Ratios from "./Ratios";
import './borderDraw.css'
import StockTable from "./StockTable";
import ReturnsModal from "./ReturnsModal"
import { 
    setBalanceData, 
    setEsData, 
    setAllocationsData, 
    setSpData, 
    setRatios,
    setSelectedMonth,
    setMonthChosen,
    setData,
    setShowGranularLineGraphModal,
    setReturnsData,
    setShowRatiosTooltip
} from "../store/slices/portfolioSlice";

export default function DashBoard({jsonData}){
    const dispatch = useDispatch();
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
    
    const { 
        selectedMonth, 
        balanceData, 
        esData, 
        allocationsData, 
        spData, 
        ratios, 
        data, 
        monthChosen, 
        showGranularLineGraphModal, 
        returnsData, 
        showRatiosTooltip 
    } = useSelector((state) => state.portfolio);

    const handleTabSwitch = e => {
        dispatch(setMonthChosen(true));
        dispatch(setSelectedMonth(e));
        dispatch(setData({
            pieData: allocationsData[monthsMap[e]], 
            tableData: allocationsData[monthsMap[e]], 
            balance: balanceData[monthsMap[e]], 
            shortfall: esData[monthsMap[e]]
        }));
    }

    useEffect(() => {        
        dispatch(setBalanceData(jsonData[0]));
        dispatch(setEsData(jsonData[1]));
        dispatch(setAllocationsData(jsonData[2]));
        dispatch(setSpData(jsonData[3]));
        dispatch(setRatios({information: jsonData[4], trenor: jsonData[5], sharpe: jsonData[6]}));
    }, [dispatch, jsonData]);

    useEffect(() => {
        var month = monthsMap[selectedMonth] + 1
        month = month < 10? '0' + month : month
        const returnsUrl = process.env.REACT_APP_API_URL + `/returns?start_date=2022-${month}-01&end_date=2022-${month}-31`;
        console.log(returnsUrl)
        fetch(returnsUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({})})
        .then(response => response.json())
        .then(jsonData => {
          dispatch(setReturnsData(jsonData));
        })
        .catch(error => {
          alert('Error fetching returns: Please try again or contact UBCTG Quant Division. \n' + error);        
        });
    }, [selectedMonth, monthsMap, dispatch])
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
                                onMouseEnter={() => dispatch(setShowRatiosTooltip(true))}
                                onMouseLeave={() => dispatch(setShowRatiosTooltip(false))}
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
                        <Button onClick={() => dispatch(setShowGranularLineGraphModal(true))} style={{margin: 7, width: 150}} variant="outline-light" > Granular Stocks</Button>
                    </div>
                    <ReturnsModal 
                        stockData={returnsData} 
                        showModal={showGranularLineGraphModal} 
                        onClose={() => dispatch(setShowGranularLineGraphModal(false))}
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
