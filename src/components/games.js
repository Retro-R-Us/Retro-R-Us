import React from 'react';
import Search from './Search';
import AddToCartButton from './AddToCartButton';
// import { getGameById } from '../../db/models/games';

const Games = ({setCartItem, games, userData }) => {
    const [filteredData, setFilteredData] = React.useState([]);


    return (    
        <div className='gamesPage'>
            <div className='gamesContainer'>
                <Search data={games} setFilteredData={setFilteredData} />
                {filteredData.length > 0 ? (<h1>Showing {filteredData.length} result(s)</h1>) : null}
                {filteredData.length > 0 ? (
                    filteredData.map((game, index) => (
                        <div className='gameCard' key={index}>
                            <h2>{game.title}</h2>
                            <img src={game.image}></img>
                            <h3>{game.description}</h3>
                            <h3>{game.console}</h3>
                            <h4>{game.year}</h4>
                            <h2>{game.price}</h2>
                            <AddToCartButton data={game} userData={userData} setCartItem={setCartItem} />
                        </div>
                    ))
                ) : (
                    games.map((game, index) => (
                        <div className='gameCard' key={index}>
                            <h2>{game.title}</h2>
                            <img src={game.image}></img>
                            <h3>{game.description}</h3>
                            <h3>{game.console}</h3>
                            <h4>{game.year}</h4>
                            <h2>{game.price}</h2>
                            <AddToCartButton data={game} userData={userData} setCartItem={setCartItem} />
                        </div>
                    ))
                )}
                
            </div>
        </div>
    );
}

export default Games;