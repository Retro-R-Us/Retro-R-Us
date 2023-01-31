import React from 'react';
import Search from './Search';
import AddToCartButton from './AddToCartButton';


const Consoles = ({ setCartItem, userData, consoles }) => {
    const [filteredData, setFilteredData] = React.useState ([]);
 

    return (
        <div className='consolesPage'>
        <div className='consolesContainer'>
        <Search data={consoles} setFilteredData={setFilteredData} />
            {filteredData.length > 0 ? (<h1>Showing {filteredData.length} result(s)</h1>) : null}
                {filteredData.length > 0 ? (
                    filteredData.map((console, index) => (
                        <div className='consoleCard' key={index}>
                            <h2>{console.title}</h2>
                            <img src={console.image}></img>
                            <h3>{console.description}</h3>
                            <h4>{console.year}</h4>
                            <h2>{console.price}</h2>
                            <AddToCartButton data={console} userData={userData} setCartItem={setCartItem} />
                        </div>
                    ))
                ) : (
                    consoles.map((console, index) => (
                        <div className='consoleCard' key={index}>
                            <h2>{console.title}</h2>
                            <img src={console.image}></img>
                            <h3>{console.description}</h3>
                            <h4>{console.year}</h4>
                            <h2>{console.price}</h2>
                            <AddToCartButton data={console} userData={userData} setCartItem={setCartItem} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}  

export default Consoles;