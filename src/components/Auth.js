import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { userAction } from '../api';
import "../style/authModal.css"

const AuthorizeUser = (props) => {
    const [userField, setUserField] = useState("");
    const [password, setPassword] = useState("");
    const [handle, setHandle] = useState("");
    const [style, setStyle] = useState();   
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState("");
    const { setToken, modalTrigger, setModalTrigger, action, setAction, setUsername } = props;

    let formTitle = "";
    if (action === "login") {
        formTitle = "Log In"
    } else if (action === "register") {
        formTitle = "Sign Up";
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username: userField,
            password: password,
            email: handle,
            admin: false,
            action: action
        }
        
        try {
            if (action === "login") {
                const response = await userAction(data);
                if (response.Success === false) {
                    setStyle({display: "none"});
                    setMessage(response.Message);
                    setSuccess(false);
                    setTimeout(() => {
                        setSuccess(null);
                        setMessage("");
                        setStyle(null);
                    }, 10000)
                } else {
                    setStyle({display: "none"});
                    setSuccess(true);
                    setToken(response.userdata.token)
                    setUsername(window.localStorage.setItem("username", response.userdata.username))
                    setMessage(response.Message)
                    setTimeout(() => {
                        setSuccess(null)
                        setModalTrigger(false)
                        setStyle(null)
                    }, 5000)
                }
            } else if (action === "register") {
                const response = await userAction(data);
                if (response.Success === false) {
                    setStyle({display: "none"});
                    setMessage(response.Message);
                    setSuccess(false);
                    setTimeout(() => {
                        setSuccess(null);
                        setMessage("");
                        setStyle(null);
                    }, 10000)
                } else  {
                    setStyle({display: "none"});
                    setSuccess(true);
                    setMessage(response.Message);
                    setTimeout(() => {
                        setSuccess(null)
                        setModalTrigger(false)
                        setStyle(null)
                    }, 5000)}
            } else { 
                setMessage()
                setSuccess(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return modalTrigger ? (
        <div className="authModal">
            <div className="innerModal">
                <span>
                    <div className="center-title">{formTitle}</div>
                    <button className="close-btn" onClick={() => {
                        setModalTrigger(false);
                        setSuccess(null)
                    }}>
                        <i className="times icon"></i>
                    </button>
                </span>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="Username" value={userField} placeholder="Username" required minLength="8" onChange={e => setUserField(e.target.value)} />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="Password" value={password} placeholder="Password" required minLength="8" onChange={e => setPassword(e.target.value)} />
                </div>
                {action === "register" ? 
                <div className="field">
                    <label>Email</label>
                    <div className="ui input">
                        <input type="Email" name="Email" value={handle} placeholder="Email" required onChange={e => setHandle(e.target.value)} />
                    </div>
                </div> : null}
                <button className="ui button positive" type="submit" style={style} >Submit</button>
            </form>
            {success ? <div className="ui success message">
                <div>Success!</div>
                <p>{message}</p>
            </div> : null
            }
            {success === false ? 
                <div className="ui error message">
                    <div>There was an error!</div>
                    <p>{message}</p>
                    {action === "register" ? 
                        <div className="ui animated button" tabIndex="0" onClick={() => {
                            setAction("login");
                        }}>
                            <div className="visible content">Switch to Login</div>
                            <div className="hidden content">
                                <i className="right arrow icon"></i>
                            </div>
                        </div>
                    :
                        null
                    }
                </div> : null
            }

            </div>
        </div>
    ) : null;
}

export default AuthorizeUser;