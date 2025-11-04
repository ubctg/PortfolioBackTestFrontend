import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EngineWait from './Components/EngineWait';
import DashBoard from './Components/DashBoard';
import Landing from './Components/Landing';


function App() {

  const [data, setData] = useState();
  const [dataRec, setDataRec] = useState(false);
  const [dashboard, setDashboard] = useState(false)
  const [landing, setLanding] = useState(true);
  const [error, setError] = useState(false)
  const [returnsData, setReturnsData] = useState();

  useEffect(() => {
    console.log("RUNNING FETCH", process.env.REACT_APP_API_URL);
    const dataUrl = process.env.REACT_APP_API_URL + '/data';
    fetch(dataUrl)
        .then(response => response.json())
        .then(jsonData => {
          console.log("TESTING")
          setData(jsonData)
          setDataRec(true)
        })
        .catch(error => {
          alert('Error fetching data: Please try again or contact UBCTG Quant Division. \n' + error);
          setError(true);
        
        });
}, []);


  return (
    <>
    {!dashboard && 
      <Landing dashClicked = {setDashboard}/>
    }
    {
      dashboard && <>
          {!dataRec && 
            <EngineWait setLanding={setLanding} dataRec={dataRec} error={error} />
          }
          {dataRec && 
            <DashBoard jsonData={data}/>  
          }
      </>
    }
    

    </>
  );
}

export default App;
