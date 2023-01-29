import React from "react";
import Search from "./Search";
import AddToCartButton from "./AddToCartButton";

const Accessories = ({ accessories, userData }) => {
    const [filteredData, setFilteredData] = React.useState([]);

    return (
        <div className="accesoriesPage">
            <Search data={accessories} setFilteredData={setFilteredData} />
            <div className="accesoriesContainer">
                {filteredData.length > 0 ? (
                    filteredData.map((accessory, index) => (
                        <div className="accessoryCard" key={index}>
                            <h1>{accessory.title}</h1>
                            <h2>{accessory.description}</h2>
                            <h3>{accessory.console}</h3>
                            <h2>{accessory.price}</h2>
                            <AddToCartButton data={accessories} userData={userData} />
                        </div>
                    ))
                ) : (
                    accessories.map((accessory, index) => (
                        <div className="accessoryCard" key={index}>
                            <h1>{accessory.title}</h1>
                            <h2>{accessory.description}</h2>
                            <h3>{accessory.console}</h3>
                            <h2>{accessory.price}</h2>
                            <AddToCartButton data={accessories} userData={userData} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Accessories;