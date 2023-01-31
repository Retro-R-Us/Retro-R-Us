import React from 'react';
import Search from './Search';
import AddToCartButton from './AddToCartButton';

const Collectibles = ({ userData, collectibles }) => {
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
                            <h3>{collectible.console}</h3>
                            <h4>{collectible.year}</h4>
                            <h2>{collectible.price}</h2>
                            <AddToCartButton data={collectible} userData={userData}/>
                        </div>
                    ))
                ) : (
                    collectibles.map((collectible, index) => (
                        <div className='collectibleCard' key={index}>
                            <h1>{collectible.title}</h1>
                            <h2>{collectible.description}</h2>
                            <h3>{collectible.console}</h3>
                            <h4>{collectible.year}</h4>
                            <h2>{collectible.price}</h2>
                            <AddToCartButton data={collectible} userData={userData}/>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}    

export default Collectibles;
