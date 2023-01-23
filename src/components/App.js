import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getAPIHealth } from "../api";
import AuthorizeUser from "./Auth";
import "../style/App.css";
import Games from "./games";
import  Consoles  from "./consoles";
import { fetchAllGames } from "../api/games";
import { fetchAllConsoles } from "../api/consoles";

const App = () => {
    const [APIHealth, setAPIHealth] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token") || null);
    const [username, setUsername] = useState(null);
    const [userData, setUserData] = useState({});
    const [games, setGames] = useState([]);
    const [consoles, setConsoles] = useState([]);


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
        const getGames = async () => {
            const games = await fetchAllGames();
            setGames(games);
        }
        getGames();
    }, []);

    useEffect(() => {
        const getConsoles = async () => {
            const consoles = await fetchAllConsoles();
            setConsoles(consoles);
        }
        getConsoles();
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
                {/* <Route exact path="/account/:action" element={<AuthorizeUser setToken={setToken} username={username}/>} /> */}
                <Route path="/games" element={<Games games={games}/>} />
                <Route path="/consoles" element={<Consoles consoles={consoles}/>} />
            </Routes>

            {/* <Footer /> */}
        </div>
    );
};

export default App;
