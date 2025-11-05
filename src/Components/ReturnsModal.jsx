import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import GranularLineGraph from "./GranularLineGraph";

export default function Contact({showModal, onClose, stockData, allocations, balance, selectedMonth}){
    const [returns, setReturns] = useState()
    const [showBL, setShowBL] = useState(true)


    useEffect(() => {
      let blReturns = {};
      if (!stockData || typeof stockData !== 'object' || !allocations || typeof allocations !== 'object') {
        setReturns({});
        return;
      }
      for (const key in allocations) {
        if (allocations.hasOwnProperty(key)) { 
          const weight = allocations[key].Weight; 
          const ticker = allocations[key].Ticker; 
          if (stockData && stockData[ticker] && Array.isArray(stockData[ticker])) {
            const temp = stockData[ticker].map(value => weight*balance + (value * weight * balance)); 
            blReturns[ticker] = temp
          }
        }
      }
      setReturns(blReturns)
    }, [stockData, allocations, balance])

    return(
        <> 
    <Modal
        show={showModal}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
      <Modal.Header>
        <Modal.Title style={{color: 'black'}}>
          {showBL? "Raw Stock Returns" : "Black-Litterman Balance"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GranularLineGraph stockData={showBL? stockData : returns} selectedMonth={selectedMonth}/>
      </Modal.Body> 
      <Modal.Footer>
  <Button onClick={() => setShowBL(!showBL)} variant="dark">{!showBL ? "Stock Returns" : "Black Litterman Evaluation"}</Button>
        <Button onClick={onClose} variant="dark">Close</Button>
        
      </Modal.Footer>
    </Modal>
      </>
    
    )
}
