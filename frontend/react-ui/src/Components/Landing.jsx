import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import About from "./About";
import JoinUs from "./JoinUs";

export default function Landing({dashClicked}){
    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 1; // Adjust the playback rate as needed
      }
    }, []);
    const [about, setAbout] = useState(false);
    const [joinUs, setJoinUs] = useState(false);

    return(
        <>
            <div class="video-background">
            <video style={{opacity: 0.7}} ref={videoRef} src="background.mp4" muted autoPlay loop id="myVideo"></video>
            <img src="logo.png" style = {{width: 200, opacity: 1.0}} />

            <div class="text-overlay">
                
            <About showAbout={about} onClose = {() => setAbout(false) }/>
            <JoinUs showJoin={joinUs} onClose = {() => setJoinUs(false) }/> 
            <div style={{textAlign: "center", paddingTop: 0, verticalAlign: "center"}}>
                <h1>UBC Trading Group</h1>
                <div style={{padding: 20, margin: 20}}>
                        <Button style={{margin: 7, width: 150}} variant="dark" onClick={e => setAbout(true)} > About Us</Button>
                        <Button style={{margin: 7, width: 150}} variant="dark" onClick = {e => setJoinUs(true)} > Join our Team</Button>
                        <Button style={{margin: 7, width: 150}} variant="dark" onClick = {e => dashClicked(true)}> Backtest Engine</Button>
                </div>
            </div>

            </div>



                    </div>

        </>
    )
}