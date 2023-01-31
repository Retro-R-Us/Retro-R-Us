import BASEURL from "./index";
import React, { Fragment, useEffect } from "react";

const MyOrders = ({ setOrdersTrigger, userData, userOrders }) => {
    if (typeof userOrders === "object") {
        userOrders = [userOrders];
    }


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
                        <div className="ui header">
                            {userOrders ? "Your Orders" : "You have Not Made Any Orders Yet"}
                        </div>
                    </div>
                </div>
                {userOrders ? (
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>Order Number</th>
                                <th>Order Status</th>
                                <th>Order Placed:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {userOrders.map((order) => {
                                    return (
                                        <Fragment key={order.orderId}>
                                            <td data-label="Order Number">{order.orderId}</td>
                                            <td data-label="Order Status">{order.status}</td>
                                            <td data-label="Order Placed">{order.createdOn}</td>
                                        </Fragment>
                                )})}
                            </tr>
                        </tbody>
                    </table>
                ) : null}
            </div>
        </div>
    );
};

export default MyOrders;
