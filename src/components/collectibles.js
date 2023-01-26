import React from 'react';
import Search from './Search';

const Collectibles = ({ collectibles }) => {
    const [filteredData, setFilteredData] = React.useState([]);

    return (
        <div className='collectiblesPage'>
        <div className='collectiblesContainer'>
        <Search data={collectibles} setFilteredData={setFilteredData} />
                {filteredData.length > 0 ? (
                    filteredData.map((collectible, index) => (
                        <div className='collectibleCard' key={index}>
                            <h1>{collectible.title}</h1>
                            <h2>{collectible.description}</h2>
                            <h4>{collectible.year}</h4>
                            <h2>{collectible.price}</h2>
                        </div>
                    ))
                ) : (
                    collectibles.map((collectible, index) => (
                        <div className='collectibleCard' key={index}>
                            <h1>{collectible.title}</h1>
                            <h2>{collectible.description}</h2>
                            <h4>{collectible.year}</h4>
                            <h2>{collectible.price}</h2>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}    

export default Collectibles;
