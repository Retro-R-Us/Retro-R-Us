import React, { useState } from "react";
import "../style/accountHome.css";

export const PassChange = (props) => {
    const { userData, setFormTrigger } = props;

    return (
        <div id="modal">
            <div id="inner">
                <div
                    id="close-btn"
                    className="ui animated fade button"
                    tabIndex="0"
                    onClick={() => setFormTrigger(false)}>
                    <div className="visible content">
                        <i className="close icon"></i>
                    </div>
                    <div className="hidden content">Close</div>
                </div>
                <div className="image content">
                    <div className="description">
                        <div className="ui header">Password Change Request</div>
                    </div>
                </div>
                <form class="ui form">
                    <div class="field">
                        <label>First Name</label>
                        <input type="text" name="first-name" placeholder="First Name" />
                    </div>
                    <div class="field">
                        <label>Last Name</label>
                        <input type="text" name="last-name" placeholder="Last Name" />
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" tabindex="0" class="hidden" />
                            <label>I agree to the Terms and Conditions</label>
                        </div>
                    </div>
                    <button class="ui button" type="submit">
                        Submit
                    </button>
                </form>

                <button
                    className="ui animated fade button"
                    tabIndex="0"
                    onClick={() => {
                        setAccountTrigger(false);
                        setFormTrigger(true);
                    }}>
                    <div className="visible content">Change Password</div>
                    <div className="hidden content">
                        <i className="angle double down icon"></i>
                    </div>
                </button>
            </div>
        </div>
    );
};
