import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './borderDraw.css'

export default function Ratios({information = 0, trenor = 0, sharpe = 0}) {

    return (
        <Card
        style={{
            width: '20rem',
            backgroundColor: "black",
            animation: "borderDraw 3s forwards", 
        }}
        >
        <Card.Body>
            <Card.Title>S&P Regression</Card.Title>
            <br />
            <Card.Subtitle>Information Ratio</Card.Subtitle>
            <Card.Text>
                <h1>{information.toFixed(2)}</h1>
            </Card.Text>
            <Card.Subtitle >Trenor Ratio</Card.Subtitle>
            <Card.Text>
                <h1>{trenor.toFixed(2)}</h1>
            </Card.Text>
            <Card.Subtitle >Sharpe Ratio</Card.Subtitle>
            <Card.Text>
                <h1>{sharpe.toFixed(2)}</h1>
            </Card.Text>
        </Card.Body>
        </Card>
    );
}
