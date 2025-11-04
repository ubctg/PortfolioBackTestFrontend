import React from 'react';
import Card from 'react-bootstrap/Card';
import './borderDraw.css'

export default function AdditionalInfo({balance = 0, shortfall = 0}) {

    return (
        <Card
        style={{
            width: '18rem',
            backgroundColor: "black",
            color: "white",
            border: "2px solid", 
            animation: "borderDraw 5s forwards", 
        }}
        >
        <Card.Body>
            <Card.Title>Additional Info</Card.Title>
            <Card.Subtitle >Balance</Card.Subtitle>
            <Card.Text>
                <h1>$ {balance}</h1>
            </Card.Text>
            <Card.Subtitle >Expected Shortfall</Card.Subtitle>
            <Card.Text>
                <h1>{shortfall}</h1>
            </Card.Text>
        </Card.Body>
        </Card>
    );
}
