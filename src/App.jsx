import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './Components/DashBoard';
import Landing from './Components/Landing';


function App() {

  const [dashboard, setDashboard] = useState(false)
  const [landing, setLanding] = useState(true);

  // Configuration for the backtest
  const backtestConfig = {
    startDate: "2020-03-01",
    endDate: "2020-12-01",
    startingBalance: 10000.0
  };

  return (
    <>
    {!dashboard && 
      <Landing dashClicked = {setDashboard}/>
    }
    {
      dashboard && 
        <DashBoard 
          startDate={backtestConfig.startDate}
          endDate={backtestConfig.endDate}
          startingBalance={backtestConfig.startingBalance}
        />  
    }
    

    </>
  );
}

export default App;
