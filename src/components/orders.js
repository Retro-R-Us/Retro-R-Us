import BASEURL from "./index";
import React, { useEffect } from "react";

const MyOrders = ({ setOrdersTrigger, userData }) => {
    


    return (
        <div id="modal">
            <div id="inner">
                <div
                    id="close-btn"
                    className="ui animated fade button"
                    tabIndex="0"
                    onClick={() => setOrdersTrigger(false)}>
                    <div className="visible content">
                        <i className="close icon"></i>
                    </div>
                    <div className="hidden content">Close</div>
                </div>
                <div className="image content">
                    <div className="description">
                        <div className="ui header">Your Orders</div>
                    </div>
                </div>
                {<table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Account Created:</th>
                            <th>Phone #</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="username"></td>
                            <td data-label="email"></td>
                            <td data-label="accountAge"></td>
                            <td data-label="phone">800-867-5309</td>
                        </tr>
                    </tbody>
                </table>}
            </div>
        </div>
  )
};

export default MyOrders;
