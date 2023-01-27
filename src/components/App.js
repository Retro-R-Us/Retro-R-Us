import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAPIHealth, getCurrentUser } from "../api";
import AuthorizeUser from "./Auth";
import Header from "./header";
import UserHeader from "./UserHeader";
import "../style/App.css";
import Games from "./games";
import Consoles from "./consoles";
import Collectibles from "./collectibles";
import { fetchAllGames } from "../api/games";
import { fetchAllConsoles } from "../api/consoles";
import { fetchAllCollectibles } from "../api/collectibles";
import Accessories from "./accessories";
import { fetchAllAccessories } from "../api/accessories";
import { Orders } from ".";

const App = () => {
    const [APIHealth, setAPIHealth] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token") || null);
    const [username, setUsername] = useState(window.localStorage.getItem("username") || null);
    const [userData, setUserData] = useState();
    const [modalTrigger, setModalTrigger] = useState(false);
    const [action, setAction] = useState(null);
    const [games, setGames] = useState([]);
    const [consoles, setConsoles] = useState([]);
    const [collectibles, setCollectibles] = useState([]);
    const [accessories, setAccessories] = useState([]);

    const history = useNavigate();

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
        };
        getGames();
    }, []);

    useEffect(() => {
        const getConsoles = async () => {
            const consoles = await fetchAllConsoles();
            setConsoles(consoles);
        };
        getConsoles();

        const getAccessories = async () => {
            const accessories = await fetchAllAccessories();
            setAccessories(accessories);
        };
        getAccessories();
    }, []);

    useEffect(() => {
        const getCollectibles = async () => {
            const collectibles = await fetchAllCollectibles();
            setCollectibles(collectibles);
        };
        getCollectibles();
    }, []);

    useEffect(() => {
        if (token) {
            window.localStorage.setItem("token", token);
            const getUserData = async () => {
                const data = await getCurrentUser(token);
                if (data.Success) {
                    window.localStorage.setItem("username", data.user.username);
                    setUserData(data);
                }
            };
            getUserData();
        } else {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("username");
        }
    }, [token]);

    const logOut = () => {
        setToken("");
        setUsername("");
        history("/");
    };

    return (
        <div className="main">
            <div className="head">
                <div className="ui tiny menu" style={{ backgroundColor: "black" }}>
                    <Header />
                    <div className="right menu">
                        <UserHeader
                            token={token}
                            setUsername={setUsername}
                            username={username}
                            logOut={logOut}
                            setModalTrigger={setModalTrigger}
                            setAction={setAction}
                            userData={userData}
                        />
                    </div>
                </div>
                <AuthorizeUser
                    setToken={setToken}
                    action={action}
                    modalTrigger={modalTrigger}
                    setModalTrigger={setModalTrigger}
                    setAction={setAction}
                    setUsername={setUsername}
                />
                <Routes>
                    <Route exact path="/" /*element={<Home user={user}/> */ />
                    <Route path="/games" element={<Games games={games} />} />
                    <Route path="/consoles" element={<Consoles consoles={consoles} />} />
                    <Route
                        path="/collectibles"
                        element={<Collectibles collectibles={collectibles} />}
                    />
                    <Route
                        path="/accessories"
                        element={<Accessories accessories={accessories} />}
                    />
                </Routes>
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default App;
