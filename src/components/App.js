import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAPIHealth, getCurrentUser } from "../api";
import AuthorizeUser from "./Auth";
import Header from "./header"
import "../style/App.css";

const App = () => {
    const [APIHealth, setAPIHealth] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token") || null);
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [modalTrigger, setModalTrigger] = useState(false);
    const [action, setAction] = useState(null);

    const history = useNavigate()

    useEffect(() => {
        // follow this pattern inside your useEffect calls:
        // first, create an async function that will wrap your axios service adapter
        // invoke the adapter, await the response, and set the data
        const getAPIStatus = async () => {
            const { healthy } = await getAPIHealth();
            setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
        };

        // second, after you've defined your getter above
        // invoke it immediately after its declaration, inside the useEffect callback
        getAPIStatus();
    }, []);

    useEffect(() => {
        if (userData) {
            setUsername(userData.userdata.username)
        }
    }, [userData]);

    useEffect(() => {
        if (token) {
            window.localStorage.setItem("token", token)
        } else {
            window.localStorage.removeItem("token")
        }
    }, [token])

    const logOut = () => {
        setToken("");
        setUsername(null);
        history("/");
    };

    return (
        <div className="main">
            <div className="head">
                <header>Retro-R-Us</header>
                <p>API Status: {APIHealth}</p>
                <Header token={token} username={username} 
                    logOut={logOut} setModalTrigger={setModalTrigger}
                    setAction={setAction} />
                <AuthorizeUser setToken={setToken} 
                    setUserData={setUserData} action={action} 
                    modalTrigger={modalTrigger} 
                    setModalTrigger={setModalTrigger} 
                    setAction={setAction} />
            </div>
            <Routes>
                <Route exact path="/" /*element={<Home user={user}/> */ />
                {/* <Route exact path="/routines" element={<Routines tokenString={tokenString} user={user} />} /> */}
                {/* <Route path="/activities" element={<Activities tokenString={tokenString} user={user}/>} /> */}
            </Routes>

            {/* <Footer /> */}
        </div>
    );
};

export default App;
