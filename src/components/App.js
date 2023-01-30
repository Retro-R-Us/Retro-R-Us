import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAPIHealth, getCurrentUser } from "../api";
import AuthorizeUser from "./Auth";
import { Account } from "./account";
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
import Home from "./home";
import Cart from "./Cart";

const App = () => {
    const [APIHealth, setAPIHealth] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token") || null);
    const [username, setUsername] = useState(window.localStorage.getItem("username") || null);
    const [userData, setUserData] = useState(undefined);
    const [userOrders, setUserOrders] = useState(undefined);
    const [modalTrigger, setModalTrigger] = useState(false);
    const [action, setAction] = useState(null);
    const [games, setGames] = useState([]);
    const [consoles, setConsoles] = useState([]);
    const [collectibles, setCollectibles] = useState([]);
    const [accessories, setAccessories] = useState([]);
    const [cart, setCart] = useState(JSON.parse(window.localStorage.getItem("cart")) || undefined);
    const [cartItem, setCartItem] = useState()

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
        if (!cartItem) {
            return;
        }
        const cartAr = JSON.parse(window.localStorage.getItem("cart"));
        if (!cartAr) {
            const newCart = [];
            newCart.push(cartItem)
            window.localStorage.setItem("cart", JSON.stringify(newCart))
            setCart(JSON.parse(window.localStorage.getItem("cart")));
        } else {
            cartAr.push(cartItem);
            window.localStorage.setItem("cart", JSON.stringify(cartAr))
            setCart(JSON.parse(window.localStorage.getItem("cart")));
        }
        
        window.localStorage.removeItem("cartItem")
    }, [cartItem]);

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
                const userInfo = data.user
                console.log(userInfo)
                const orders = data.orders
                if (data.Success) {
                    window.localStorage.setItem("username", userInfo.username);
                    setUserData(userInfo);
                    if (orders === undefined) {
                        setUserOrders(undefined)
                    } else {
                        setUserOrders(orders);
                    }
                    
                }
            };
            getUserData();
        } else {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("username");
            setUserData(undefined);
            setUserOrders(undefined)
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
                <Route exact path="/" element={<Home />} />
                <Route path="/user/cart" element={<Cart cart={cart} setCart={setCart}/>} />
                <Route path="/consoles" element={<Consoles consoles={consoles} userData={userData} setCartItem={setCartItem}/>} />
                <Route path="/games" element={<Games games={games} userData={userData} setCartItem={setCartItem}/>} />
                <Route
                    path="/collectibles"
                    element={<Collectibles collectibles={collectibles} userData={userData}setCartItem={setCartItem}/>}
                />
                <Route path="/account" element={<Account userData={userData} token={token} userOrders={userOrders}/>} />
                <Route path="/accessories" element={<Accessories accessories={accessories} userData={userData} setCartItem={setCartItem}/>} />
            </Routes>

            {/* <Footer /> */}

        </div>
    );
};

export default App;
