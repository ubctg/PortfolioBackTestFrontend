import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EngineWait from './Components/EngineWait';
import DashBoard from './Components/DashBoard';
import Landing from './Components/Landing';
import { 
  setDashboard, 
  setLanding, 
  setError, 
  setBalanceData, 
  setEsData, 
  setAllocationsData, 
  setSpData, 
  setRatios 
} from './store/slices/portfolioSlice';

function App() {
  const dispatch = useDispatch();
  
  const { dashboard, error, dataRec } = useSelector((state) => state.portfolio);

  useEffect(() => {
    console.log("RUNNING FETCH", process.env.REACT_APP_API_URL);
    const dataUrl = process.env.REACT_APP_API_URL + '/data';
    fetch(dataUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        start_date: "2020-03-01",
        end_date: "2020-12-01",
        starting_balance: 10000.0
      })
    })
        .then(response => response.json())
        .then(jsonData => {
          console.log("TESTING")
          console.log(jsonData)
          dispatch(setBalanceData(jsonData[0]));
          dispatch(setEsData(jsonData[1]));
          dispatch(setAllocationsData(jsonData[2]));
          dispatch(setSpData(jsonData[3]));
          dispatch(setRatios({information: jsonData[4], trenor: jsonData[5], sharpe: jsonData[6]}));
        })
        .catch(error => {
          alert('Error fetching data: Please try again or contact UBCTG Quant Division. \n' + error);
          dispatch(setError(true));
        });
  }, [dispatch]);

  const handleDashboardClick = (value) => {
    dispatch(setDashboard(value));
  };

  const handleSetLanding = (value) => {
    dispatch(setLanding(value));
  };

  return (
    <>
    {!dashboard && 
      <Landing dashClicked={handleDashboardClick}/>
    }
    {
      dashboard && <>
          {!dataRec && 
            <EngineWait setLanding={handleSetLanding} dataRec={dataRec} error={error} />
          }
          {dataRec && 
            <DashBoard />  
          }
      </>
    }
    </>
  );
}

export default App;
