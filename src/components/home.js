import React, { useState } from 'react';
import logo from './/images/retro-r-us.png';
import "../style/home.css"

const Home = () => {
    return (
        <>
            <ul className="cb-slideshow">
                <li><span>Image1</span></li>
                <li><span>Image2</span></li>
                <li><span>Image3</span></li>
                <li><span>Image4</span></li>
                <li><span>Image5</span></li>
                <li><span>Image6</span></li>
            </ul>
        <div className="homeContainer">
            
        <img src={logo} className="logo" alt="logo"></img>
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
        </div>
        </>
)
}

export default Home;