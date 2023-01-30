import React from 'react';
import Search from './Search';
import AddToCartButton from './AddToCartButton';


const Consoles = ({ userData, consoles }) => {
    const [filteredData, setFilteredData] = React.useState ([]);
 

    return (
        <div className='consolesPage'>
        <div className='consolesContainer'>
        <Search data={consoles} setFilteredData={setFilteredData} />
                {filteredData.length > 0 ? (
                    filteredData.map((console, index) => (
                        <div className='consoleCard' key={index}>
                            <h1>{console.title}</h1>
                            <img alt={console.image} src={`/components/Product_Images/${console.image}`}/>
                            <h2>{console.description}</h2>
                            <h4>{console.year}</h4>
                            <h2>{console.price}</h2>
                            <AddToCartButton data={consoles} userData={userData}/>
                        </div>
                    ))
                ) : (
                    consoles.map((console, index) => (
                        <div className='consoleCard' key={index}>
                            <h1>{console.title}</h1>
                            <h2>{console.description}</h2>
                            <h4>{console.year}</h4>
                            <h2>{console.price}</h2>
                            <AddToCartButton data={consoles} userData={userData}/>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}  

export default Consoles;