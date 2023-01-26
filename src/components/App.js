import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAPIHealth } from "../api";
import AuthorizeUser from "./Auth";
import Header from "./header"
import "../style/App.css";
import Games from "./games";
import Consoles  from "./consoles";
import Collectibles from "./collectibles";
import { fetchAllGames } from "../api/games";
import { fetchAllConsoles } from "../api/consoles";
import { fetchAllCollectibles } from "../api/collectibles";
import Accessories from "./accessories";
import { fetchAllAccessories } from "../api/accessories";
import { Orders } from '.';


const App = () => {
    const [APIHealth, setAPIHealth] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token") || null);
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [modalTrigger, setModalTrigger] = useState(false);
    const [action, setAction] = useState(null);
    const [games, setGames] = useState([]);
    const [consoles, setConsoles] = useState([]);
    const [collectibles, setCollectibles] = useState([]);
    const [accessories, setAccessories] = useState([]);


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
  
    // useEffect(() => {
    //     const getOrders = async () => {
    //         const orders = await getAllOrders();
    //         setOrders(orders);
    //   }
    //   getOrders();
    // }, [userData]);

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
        
        const getAccessories = async () => {
            const accessories = await fetchAllAccessories();
            setAccessories(accessories);
        }
        getAccessories();
    }, []);

    useEffect(() => {
        const getCollectibles = async () => {
            const collectibles = await fetchAllCollectibles();
            setCollectibles(collectibles);
        }
        getCollectibles();
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
        <div className="card">
            <h1>Weekly Tournaments</h1>
            <img src="https://cdn.evbuc.com/images/416863809/555909054187/1/logo.20230103-021945"></img>
            <p>Play Mortal Kombat in our upcoming tournament!</p>
        </div>
        <div className="card">
            <h1>Visit the National Video Game Museum</h1>
            <img src="https://www.roadsideamerica.com/attract/images/tx/TXFRIvideo_arcade2_620x300.jpg"></img>
            <p>If you're in Frisco, TX take a step back in time and visit the National Video Game Museum. The only museum where you get to touch the things!</p>
        </div>
            <Routes>
                <Route exact path="/" /*element={<Home user={user}/> */ />
                <Route path="/games" element={<Games games={games}/>} />
                <Route path="/consoles" element={<Consoles consoles={consoles}/>} />
                <Route path="/collectibles" element={<Collectibles collectibles={collectibles}/>} />
                <Route path="/accessories" element={<Accessories accessories={accessories}/>} />
            </Routes>
           
            {/* <Footer /> */}
        </div>
    );
};

export default App;
