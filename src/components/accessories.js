import React from "react";
import Search from "./Search";

const Accessories = ({ accessories }) => {
    const [filteredData, setFilteredData] = React.useState([]);

    return (
        <div className="accesoriesPage">
            <div className="accesoriesContainer">
                <Search data={accessories} setFilteredData={setFilteredData} />
                {filteredData.length > 0 ? (
                    filteredData.map((accessory, index) => (
                        <div className="accessoryCard" key={index}>
                            <h1>{accessory.title}</h1>
                            <h2>{accessory.description}</h2>
                            <h3>{accessory.console}</h3>
                            <h4>{accessory.year}</h4>
                            <h2>{accessory.price}</h2>
                        </div>
                    ))
                ) : (
                    accessories.map((accessory, index) => (
                        <div className="accessoryCard" key={index}>
                            <h1>{accessory.title}</h1>
                            <h2>{accessory.description}</h2>
                            <h3>{accessory.console}</h3>
                            <h4>{accessory.year}</h4>
                            <h2>{accessory.price}</h2>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Accessories;