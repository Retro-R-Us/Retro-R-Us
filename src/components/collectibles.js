import React from 'react';

const Collectibles = ({ collectibles }) => {

    return (
        <div className='collectiblesPage'>
        <div className='collectiblesContainer'>
            {collectibles && collectibles.map(collectible => {
                return (
                    <div className='consoleCard' key={collectible.collectibleId}>
                        <h1>{collectible.title}</h1>
                        <h2>{collectible.description}</h2>
                        <h3>{collectible.console}</h3>
                        <h2>{collectible.price}</h2>
                    </div>
                );
            })}
        </div>
    </div>
    )
}

export default Collectibles;
