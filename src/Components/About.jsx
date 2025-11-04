import { Button, Modal } from "react-bootstrap";

export default function About({showAbout, onClose}){


    return(
    
        <> 
    <Modal
        show={showAbout}
        size="lg"
        animation="true"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
      <Modal.Header>
        <Modal.Title style={{color: 'black'}}>
            About UBC Trading Group 
       </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        We are the UBC Trading Group, a student led, cross-departmental financial club at UBC. Comprised of two major teams, the Analyst Team,
        and the Quantitative Team, we blah blah blah...
      </Modal.Body> 
      <Modal.Footer>
        <Button onClick={onClose} variant="dark">Close</Button>
      </Modal.Footer>
    </Modal>
      </>
    
    )
}