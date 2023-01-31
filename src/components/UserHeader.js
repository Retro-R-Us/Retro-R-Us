import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/header.css"

const UserHeader = (props) => {
    const { token, username, setUsername, logOut, setModalTrigger, setAction } = props;

    useEffect(() => {
        setUsername(window.localStorage.getItem("username"));
    }, [username]);

    return (
        <Fragment>
            {token ? null : (
                <div className="item">
                    <button
                        className="ui inverted primary button"
                        onClick={() => {
                            setAction("register"), setModalTrigger(true);
                        }}>
                        Sign Up
                    </button>
                </div>
            )}
            {token ? (
                <div className="item">
                    <button className="ui button" onClick={logOut}>
                        Log Out
                    </button>
                </div>
            ) : (
                <div className="item">
                    <button
                        className="ui inverted primary button"
                        onClick={() => {
                            setAction("login"), setModalTrigger(true);
                        }}>
                        Login
                    </button>
                </div>
            )}
            <div className="item">
                <Link className="ui animated button" to="/user/cart" tabIndex="0">
                    <div className="hidden content">Cart</div>
                    <div className="visible content">
                        <i className="shop icon"></i>
                    </div>
                </Link>
            </div>
            {token ? (
                <Fragment>
                    <div className="item authbar">
                        <Link className="ui button" to="/account" style={{color: "green"}}>
                            <i aria-hidden="true" className="green users icon"></i>
                            {username}
                        </Link>
                    </div>
                </Fragment>
            ) : (
                <div className="item authbar" style={{color: "red"}}>
                    <i aria-hidden="true" className="red users icon"></i>
                    Not Logged In
                </div>
            )}
        </Fragment>
    );
};

export default UserHeader;
