import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/accountHome.css";
import accountimg from "./images/account.png";
import supportimg from "./images/support.png";
import ordersimg from "./images/orders.png";

export const Account = (props) => {
    const [accountTrigger, setAccountTrigger] = useState(false);
    const [ordersTrigger, setOrdersTrigger] = useState(false);
    const [supportTrigger, setSupportTrigger] = useState(false);
    const {} = props;

    return (
        <div className="accountContainer">
            <div className="ui link cards">
                <div className="card" onClick={() => setAccountTrigger(true)}>
                    <div className="image">
                        <img src={accountimg} />
                    </div>
                    <div className="content">
                        <div className="header">Account</div>
                    </div>
                </div>
                <div className="card" onClick={() => setOrdersTrigger(true)}>
                    <div className="image">
                        <img src={ordersimg} />
                    </div>
                    <div className="content">
                        <div className="header">Orders</div>
                    </div>
                </div>
                <div className="card" onClick={() => setSupportTrigger(true)}>
                    <div className="image">
                        <img src={supportimg} />
                    </div>
                    <div className="content">
                        <div className="header">Support</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
