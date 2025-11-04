import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';


export default function StockTable({data}){


    return(
    <>
      <Table striped bordered hover size="sm" variant="dark" responsive="lg">
        <thead>
          <tr>
            <th>Permno</th>
            <th>Ticker</th>
            <th>Weight</th>
            <th>Returns</th>
          </tr>
        </thead>  
        <tbody>
          {Object.entries(data).map(([name, value], index) => (
            <tr>
              <td>{name}</td>
              <td>{value["Ticker"]}</td>
              <td>{value["Weight"].toFixed(2)}</td>
              <td>{value["Returns"].toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
    )
}