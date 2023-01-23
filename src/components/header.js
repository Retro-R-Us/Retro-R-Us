import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {
    const { token, username, logOut, setModalTrigger, setAction } = props;

    return (
        <div className="ui menu" style={{ marginBottom: "20px" }}>
            <Link className="ui button" to="/">
                Home
            </Link>
            {token ? (
                <button className="ui button" onClick={logOut}>Log Out</button>
            ) : (
                <button className="ui button" onClick={() => {
                    setAction("login"),
                    setModalTrigger(true)
                }}>Login</button>
            )}
            {token ? null : (
                <button className="ui button" onClick={() => {
                    setAction("register"),
                    setModalTrigger(true)
                }}>Sign Up</button>
            )}
            {token ? (
                <Link className="ui label" to="/account">
                    <i aria-hidden="true" className="green users circular icon"></i>
                    {username}
                </Link>
            ) : <div className="ui label">
                    <i aria-hidden="true" className="red users circular icon"></i>
                    {`Not Logged In`}
                </div>
            }
        </div>
    );
};

export default Header;
