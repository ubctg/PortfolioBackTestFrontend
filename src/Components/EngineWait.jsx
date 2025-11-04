import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Spinner from 'react-bootstrap/Spinner';


export default function EngineWait({setLanding, dataRec, error}){

    const [isFetching, setIsFetching] = useState(dataRec);

    useEffect(() => {
      setIsFetching(dataRec);
    }, [dataRec]);

    return(
    <>
        <div style={{backgroundColor: "black", position: "fixed", width: "100%", height: "100%"}}>
        <img src="logo.png" style = {{width: 200}} />
        <div style={{textAlign: "center", paddingTop: 200}}>
            <h1 style={{color: "white"}}>Backtest Engine</h1>
            <br />
            {
                !isFetching && 
                <>
                  {!error && 
                    <Button variant="light" disabled={true}> Fetching Data </Button>
                  }
                  {error && 
                    <Button variant="light" disabled={true}> Error While Fetching Data. Please Try Again </Button>
                  }
                  <br />
                  <br />
                  <Spinner animation="grow" variant="light" />
                  <Spinner animation="grow" variant="light" />
                  <Spinner animation="grow" variant="light" />
                </>

            
            }
            {
                isFetching && 
                <Button variant = "dark" onClick={e => setLanding(false)}>Get Started</Button>

            }
        </div>
        </div>
    </>
    )
}