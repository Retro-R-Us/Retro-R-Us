import React from "react";

const Accessories = ({ accessories }) => {
    return (
        <div className="accesoriesPage">
            <div className="accesoriesContainer">
                {accessories && accessories.map(accessory => {
                    return (
                        <div className="accessoryCard" key={accessory.accessoryId}>
                            <h1>{accessory.title}</h1>
                            <h2>{accessory.description}</h2>
                            <h3>{accessory.console}</h3>
                            <h2>{accessory.price}</h2>
                        </div>
                    );
                }
                )}
            </div>
        </div>
    );
}

export default Accessories;