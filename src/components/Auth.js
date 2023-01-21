import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { userAction } from '../api';

const AuthorizeUser = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [handle, setHandle] = useState("");
    const [select, setSelect] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(null);
    const [style, setStyle] = useState();
    const { setUserData } = props;

    const { setToken } = props;
    const { action } = useParams();
    const history = useNavigate();

    let formTitle = "";
    if (action === "login") {
        formTitle = "Log In"
    } else if (action === "register") {
        formTitle = "Sign Up";
    }

    const domains = [null, ".com", ".net", ".org"]

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = `${handle}${select}`;
        const data = {
            username: username,
            password: password,
            email: email,
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
                    setInterval(() => {
                        setSuccess(null);
                        setMessage("");
                        setStyle(null);
                    }, 7500)
                } else {
                    setUserData(response.userdata)
                    setStyle({display: "none"});
                    setSuccess(true);
                    setToken(response.userdata.token)
                    setMessage(response.Message)
                    setInterval(() => {
                        setSuccess(null)
                        history("/")
                    }, 5000)
                }
            } else if (action === "register") {
                const response = await userAction(data);
                if (response.Success === false) {
                    setStyle({display: "none"});
                    setMessage(response.Message);
                    setSuccess(false);
                    setInterval(() => {
                        setSuccess(null);
                        setMessage("");
                        setStyle(null);
                    }, 7500)
                } else  {
                    setStyle({display: "none"});
                    setSuccess(true);
                    setMessage(response.Message);
                    setInterval(() => {
                        setSuccess(null)
                        history("/")
                    }, 5000)}
            } else { 
                setMessage()
                setSuccess(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return formTitle ? (
        <div className="auth">
            <div className="authFormTitle">{formTitle}</div>
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
                        <select value={select} required onChange={e => setSelect(e.target.value)} >
                            {domains.map((domain, key) => (<option key={key} value={domain}>{domain}</option>))}
                        </select>
                    </div>
                </div> : null}
                <button className="ui button basic positive" type="submit" style={style} >Submit</button>
            </form>
            {success === true ? 
                <div className="ui success message">
                    <div>Success!</div>
                    <p>{message}</p>
                    <p>You are now being redirected back to the homepage</p>
                </div> 
            : 
                null
            }
            {success === false ? 
                <div className="ui error message">
                    <div>There was an error!</div>
                    <p>{message} <button>here</button></p>
                </div>
            :
                null
            }
        </div>
    ) : null;
}

export default AuthorizeUser;
