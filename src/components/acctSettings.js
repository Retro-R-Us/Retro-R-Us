import React, { Fragment } from "react";
import "../style/accountHome.css";

export const AccountSettings = (props) => {
    const { setAccountTrigger } = props;

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
                        <div className="ui header">We've auto-chosen a profile image for you.</div>
                    </div>
                </div>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone #</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Name">James</td>
                            <td data-label="Age">24</td>
                            <td data-label="Job">Engineer</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
