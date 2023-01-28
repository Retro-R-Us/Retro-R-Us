import React, { useState } from 'react';

const Home = () => {
    return (
        <div className='ui cards'>
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
)
}

export default Home;