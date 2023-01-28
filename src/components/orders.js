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
                    onClick={() => exitFunc()}>
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
            </div>
        </div>
  )
};

export default MyOrders;
