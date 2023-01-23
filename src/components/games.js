import React from 'react';
import Search from './Search';

const Games = ({ games }) => {
    const [filteredData, setFilteredData] = React.useState([]);

    /* How Search Works With Parent Components:
        The Search component is passed down games as 'data' and setFilteredData as a prop.
        As an example, an 'Accessories.js' the accessories are passed down to the Search component as 'data'.
        The Search component will update the filteredData state when a search is made.
        filteredData will be empty by default and only update when a search is made.
        A ternary is used to check if filteredData has any data in it, if it does, it will map over the filteredData and display it.
        Otherwise it will map over the games data and display it.
    */

    return (    
        <div className='gamesPage'>
            <div className='gamesContainer'>
                <Search data={games} setFilteredData={setFilteredData} />
                {filteredData.length > 0 ? (
                    filteredData.map((game) => (
                        <div className='gameCard' key={game.id}>
                            <h1>{game.title}</h1>
                            <h2>{game.description}</h2>
                            <h3>{game.console}</h3>
                            <h4>{game.year}</h4>
                            <h2>{game.price}</h2>
                        </div>
                    ))
                ) : (
                    games.map((game) => (
                        <div className='gameCard' key={game.id}>
                            <h1>{game.title}</h1>
                            <h2>{game.description}</h2>
                            <h3>{game.console}</h3>
                            <h4>{game.year}</h4>
                            <h2>{game.price}</h2>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Games;