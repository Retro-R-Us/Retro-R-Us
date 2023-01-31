import React from 'react';
import Search from './Search';
import AddToCartButton from './AddToCartButton';
import "../style/search.css"

const Collectibles = ({setCartItem, userData, collectibles }) => {
    const [filteredData, setFilteredData] = React.useState([]);

    return (
        <div className='collectiblesPage'>
            <Search data={collectibles} setFilteredData={setFilteredData} />
            <div className='collectiblesContainer'>
                {filteredData.length > 0 ? (
                    filteredData.map((collectible, index) => (
                        <div className='collectibleCard' key={index}>
                            <h2>{collectible.title}</h2>
                            <h3>{collectible.description}</h3>
                            <h3>{collectible.console}</h3>
                            <h4>{collectible.year}</h4>
                            <h4>{collectible.price}</h4>
                            <AddToCartButton data={collectible} userData={userData} setCartItem={setCartItem} />
                        </div>
                    ))
                ) : (
                    collectibles.map((collectible, index) => (
                        <div className='collectibleCard' key={index}>
                            <h2>{collectible.title}</h2>
                            <h3>{collectible.description}</h3>
                            <h3>{collectible.console}</h3>
                            <h4>{collectible.year}</h4>
                            <h4>{collectible.price}</h4>
                            <AddToCartButton data={collectible} userData={userData} setCartItem={setCartItem} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}    

export default Collectibles;
