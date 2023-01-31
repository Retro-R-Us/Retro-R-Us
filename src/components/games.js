import React from 'react';
import Search from './Search';
import AddToCartButton from './AddToCartButton';

const Games = ({setCartItem, games, userData }) => {
    const [filteredData, setFilteredData] = React.useState([]);


    return (    
        <div className='gamesPage'>
            <div className='gamesContainer'>
                <Search data={games} setFilteredData={setFilteredData} />
                {filteredData.length > 0 ? (
                    filteredData.map((game, index) => (
                        <div className='gameCard' key={index}>
                            <h1>{game.title}</h1>
                            <h2>{game.description}</h2>
                            <h3>{game.console}</h3>
                            <h4>{game.year}</h4>
                            <h2>{game.price}</h2>
                            <AddToCartButton data={game} userData={userData} setCartItem={setCartItem} />
                        </div>
                    ))
                ) : (
                    games.map((game, index) => (
                        <div className='gameCard' key={index}>
                            <h1>{game.title}</h1>
                            <h2>{game.description}</h2>
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