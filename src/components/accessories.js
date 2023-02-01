import React from "react";
import Search from "./Search";
import AddToCartButton from "./AddToCartButton";

const Accessories = ({setCartItem, accessories, userData }) => {
    const [filteredData, setFilteredData] = React.useState([]);

    return (
        <div className="accesoriesPage">
            <div className="accesoriesContainer">
                <Search data={accessories} setFilteredData={setFilteredData} />
                {filteredData.length > 0 ? (<h1>Showing {filteredData.length} result(s)</h1>) : null}
                {filteredData.length > 0 ? (
                    filteredData.map((accessory, index) => (
                        <div className="accessoryCard" key={index}>
                            <h2>{accessory.title}</h2>
                            <img src={accessory.image}></img>
                            <h3>{accessory.description}</h3>
                            <h3>{accessory.console}</h3>
                            <h2>{accessory.price}</h2>
                            <AddToCartButton data={accessory} userData={userData} setCartItem={setCartItem} />
                        </div>
                    ))
                ) : (
                    accessories.map((accessory, index) => (
                        <div className="accessoryCard" key={index}>
                            <h2>{accessory.title}</h2>
                            <img src={accessory.image}></img>
                            <h3>{accessory.description}</h3>
                            <h3>{accessory.console}</h3>
                            <h2>{accessory.price}</h2>
                            <AddToCartButton data={accessory} userData={userData} setCartItem={setCartItem} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Accessories;