import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userAction } from '../api';

const AuthorizeUser = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email,
            admin: false,
            action: action
        }
        
        try {
            if (action === "login") {
                const userData = await userAction(data);
                setUserData(userData)
                console.log("USERDATA:", userData)
            } else if (action === "register") {
                const response = await userAction(data);
                console.log("RESPONSE:", response)
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
                    <input type="text" name="Username" placeholder="Username" minLength="8" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="Password" placeholder="Password" minLength="8" onChange={e => setPassword(e.target.value)} />
                </div>
                {action === "register" ? <div className="field">
                    <label>Email</label>
                        <input type="email" name="EmailHandle" placeholder="Email"  onChange={e => setEmail(e.target.value)} />
                </div> : null}
                <button className="ui button basic positive" type="submit" >Submit</button>
            </form>
        </div>
    ) : null;
}

export default AuthorizeUser;


{/* <div class="ui success message">
<div class="header">Form Completed</div>
<p>You're all signed up for the newsletter.</p>
</div> */}

{/* <div class="ui error message">
    <div class="header">Action Forbidden</div>
    <p>You can only sign up for an account once with a given e-mail address.</p>
  </div> */}
