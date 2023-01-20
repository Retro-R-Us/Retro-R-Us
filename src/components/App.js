import React, { useState, useEffect } from "react";
import { Routes } from "react-router-dom";
import { getAPIHealth } from "../api";
import "../style/App.css";

const App = () => {
    const [APIHealth, setAPIHealth] = useState("");

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

    return (
        <div className="main">
            <div className="head">
                <header>Retro-R-Us</header>
                <p>API Status: {APIHealth}</p>
                {/* <Header tokenString={tokenString} user={user} logOut={logOut}/> */}
            </div>
            <Routes>
                {/* <Route exact path="/" element={<Home user={user}/>} /> */}
                {/* <Route exact path="/routines" element={<Routines tokenString={tokenString} user={user} />} /> */}
                {/* <Route exact path="/account/:action" element={<AuthorizeUser setTokenString={setTokenString} tokenString={tokenString} user={user}/>} /> */}
                {/* <Route path="/activities" element={<Activities tokenString={tokenString} user={user}/>} /> */}
            </Routes>

            {/* <Footer /> */}
        </div>
    );
};

export default App;
