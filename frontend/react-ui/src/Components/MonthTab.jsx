import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function MonthTabs({months, handleTabSwitch}){
    return (
        <div style={{backgroundColor: "black"}}>

        <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
            onSelect={handleTabSwitch}
        >
            {months.map((x, index) => (<Tab key={index} eventKey={x} title={x}></Tab>))}
        </Tabs>
        </div>

    );
}
