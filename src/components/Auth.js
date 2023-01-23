import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { userAction } from '../api';
import "../style/authModal.css"

const AuthorizeUser = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [handle, setHandle] = useState("");
    const [style, setStyle] = useState();   
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState("");
    const { setUserData, setToken, modalTrigger, setModalTrigger, action, setAction } = props;

    let formTitle = "";
    if (action === "login") {
        formTitle = "Log In"
    } else if (action === "register") {
        formTitle = "Sign Up";
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username: username,
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
                    }, 7500)
                } else {
                    console.log("USERDATA:", response)
                    setUserData(response.userdata)
                    setStyle({display: "none"});
                    setSuccess(true);
                    setToken(response.userdata.token)
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
                    }, 7500)
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
            <div className="center-title">{formTitle}</div>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="Username" placeholder="Username" required minLength="8" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="Password" placeholder="Password" required minLength="8" onChange={e => setPassword(e.target.value)} />
                </div>
                {action === "register" ? 
                <div className="field">
                    <label>Email</label>
                    <div className="ui input">
                        <input type="Email" name="Email" placeholder="Email" required onChange={e => setHandle(e.target.value)} />
                    </div>
                </div> : null}
                <button className="ui button positive" type="submit" style={style} >Submit</button>
            </form>
            {success ? <div className="ui success message">
                <div>Success!</div>
                <p>{message}</p>
            </div> : null
            }
            {success === false ? <div className="ui error message">
                <div>There was an error!</div>
                <p>{message}</p>
            </div> : null
            }

            </div>
        </div>
    ) : null;
}

export default AuthorizeUser;


{/* <div className="ui animated button" tabIndex="0">
                    <div className="visible content">Next</div>
                    <div className="hidden content">
                        <i className="right arrow icon"></i>
                    </div>
                </div> */}