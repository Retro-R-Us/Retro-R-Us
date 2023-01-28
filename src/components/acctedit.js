import React, { useState } from "react";
import "../style/accountHome.css";
import { updateUserPass } from "../api";

export const PassChange = (props) => {
    const { userData, setFormTrigger, token } = props;

    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [CnewPwd, setCnewPwd] = useState("");
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("PASSWORDS:", oldPwd, newPwd, CnewPwd)
            const response = await updateUserPass(token, userData.username, oldPwd, newPwd)
            if (response.Success) {
                setMessage(response.Message);
                setSuccess(true);
            } else if (response.Success === false) {
                setMessage(response.message);
                setSuccess(false);
            }
        } catch (error) {
            throw error;
        }
    };

    const exitFunc = () => {
        setMessage("")
        setSuccess(null)
        setOldPwd("")
        setNewPwd("")
        setCnewPwd("")
        setFormTrigger(false)
    }

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
                        <div className="ui header">Password Change Request</div>
                    </div>
                </div>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Previous Password</label>
                        <input
                            type="password"
                            name="oldpwd"
                            value={oldPwd}
                            required
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
                            required
                            minLength="8"
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
                            required
                            minLength="8"
                            onChange={(e) => {
                                setCnewPwd(e.target.value)
                                if (CnewPwd !== newPwd) {
                                    setMessage("Passwords must match");
                                } else {
                                    setMessage("")
                                }
                            }}
                        />
                    </div>
                    <button className="ui animated fade button" type="submit">
                        <div className="visible content">Submit</div>
                        <div className="hidden content">
                            <i className="checkmark icon"></i>
                        </div>
                    </button>
                </form>
                {success === true ? (
                    <div className="ui positive message">
                        <i className="close icon"></i>
                        <div className="header">
                            {message}
                        </div>
                    </div>
                ) : null}
                {success === false ? (
                    <div className="ui negative message">
                        <i className="close icon"></i>
                        <div className="header">
                            {message}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
