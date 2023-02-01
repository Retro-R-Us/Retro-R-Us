import React, {useState, useEffect} from 'react';
import { userAction } from '../api';

const OrderConfirmation = ({ userData }) => {
    const [code, setCode] = useState();
    const [confUsername, setConfUsername] = useState(window.localStorage.getItem("username") || null);
    const [confEmail, setConfEmail] = useState();

    const givenSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

        useEffect(() => {
            setConfEmail(userData.email)
        }, []);

        useEffect(() => {
            const confNum = () => {
            let tempCode = "";
                for (let i=0; i<5; i++) {
                    let pos = Math.floor(Math.random()*givenSet.length);
                    tempCode += givenSet[pos]   
                }
            setCode(tempCode);
        }  
            confNum()
    }, []);

    return (
    <div className="order-info">
        <h1>Order Confirmed!</h1>
                <h2>Please check your email for updates on your order.</h2>
                <h3>Confirmation Number: {code} <span className="order"></span></h3>
                <h3>Name: {confUsername} <span></span></h3>
                <h3>Email: {confEmail} <span className="customer-email"></span></h3>
                <img src="https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png"></img>      
        <h2 style={{color: "white" }}>We appreciate your business!</h2>
    </div>
    )
}


export default OrderConfirmation;
