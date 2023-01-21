import React from 'react';

const Games = ({ games }) => {

    return (
        <div className='gamesPage'>
            <div className='gamesContainer'>
                {games && games.map(game => {
                    return (
                        <div className='gameCard' key={game.gameId}>
                            <h1>{game.title}</h1>
                            <h2>{game.description}</h2>
                            <h3>{game.console}</h3>
                            <h3>{game.year}</h3>
                            <h2>{game.price}</h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Games;