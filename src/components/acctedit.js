import React, { useState } from "react";
import "../style/accountHome.css";

export const PassChange = (props) => {
    const { userData, setFormTrigger } = props;

    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [CnewPwd, setCnewPwd] = useState("");

    const handleSubmit = () => {};

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
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Previous Password</label>
                        <input
                            type="text"
                            name="oldpwd"
                            value={oldPwd}
                            placeholder="Your Previous Password"
                            onChange={(e) => setOldPwd(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newpwd"
                            value={newPwd}
                            placeholder="Your New Password"
                            onChange={(e) => setNewPwd(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            name="confnewpwd"
                            value={CnewPwd}
                            onChange={(e) => setCnewPwd(e.target.value)}
                        />
                    </div>
                    <button className="ui animated fade button" type="submit">
                        <div className="visible content">Submit</div>
                        <div className="hidden content">
                            <i className="checkmark icon"></i>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
};
