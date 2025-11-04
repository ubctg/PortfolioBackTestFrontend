import { Button, Modal } from "react-bootstrap";

export default function JoinUs({showJoin, onClose}){


    return(
    
        <> 
    <Modal
        show={showJoin}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered        
    >
      <Modal.Header>
        <Modal.Title style={{color: 'black'}}>
            About UBC Trading Group 
       </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Interested in joining our team? ...
      </Modal.Body> 
      <Modal.Footer>
        <Button onClick={onClose} variant="dark">Close</Button>
      </Modal.Footer>
    </Modal>
      </>
    
    )
}