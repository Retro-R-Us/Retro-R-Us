import nodeTimeAgo from "node-time-ago";
import { createPortal } from "react-dom";
import React, { useState, Fragment } from "react";
import "../style/accountHome.css";

export const AccountSettings = (props) => {
    const { setAccountTrigger, userData, setFormTrigger } = props;

    const accountage = nodeTimeAgo(userData.createdOn);

    return (
        <div id="modal">
            <div id="inner">
                <div
                    id="close-btn"
                    className="ui animated fade button"
                    tabIndex="0"
                    onClick={() => setAccountTrigger(false)}>
                    <div className="visible content">
                        <i className="close icon"></i>
                    </div>
                    <div className="hidden content">Close</div>
                </div>
                <div className="image content">
                    <div className="description">
                        <div className="ui header">Account Details</div>
                    </div>
                </div>
                <table className="ui celled table">
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
                            <td data-label="username">{userData.username}</td>
                            <td data-label="email">{userData.email}</td>
                            <td data-label="accountAge">{accountage}</td>
                            <td data-label="phone">800-867-5309</td>
                        </tr>
                    </tbody>
                </table>
                <div className="ui animated fade button" tabIndex="0" onClick={() => {
                        setFormTrigger(true)
                        setAccountTrigger(false);
                    }}>
                    <div className="visible content">Change Password</div>
                    <div className="hidden content">
                        <i className="angle double down icon"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};
