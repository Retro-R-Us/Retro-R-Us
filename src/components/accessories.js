import React from "react";
import Search from "./Search";
import AddToCartButton from "./AddToCartButton";
import "../style/cards.css";
import n64con from "./Product_Images/n64con.png";

const Accessories = ({ setCartItem, accessories, userData }) => {
    const [filteredData, setFilteredData] = React.useState([]);

    return (
        <div className="accesoriesPage">
            <Search data={accessories} setFilteredData={setFilteredData} />
            <div className="accessoriesContainer">
                <div className="ui link cards">
                    {filteredData.length > 0
                        ? filteredData.map((accessory, index) => (
                              <div className="card accCard" key={index} style={{background: "none", backgroundColor: "rgba(138,192,240,.8)"}}>
                                  <div className="image">
                                      <img src="" />
                                  </div>
                                  <div className="content">
                                      <div className="header">{accessory.title}</div>
                                      <div className="meta">
                                          <a>Console: {accessory.console}</a>
                                      </div>
                                      <div className="description">
                                        {accessory.description}
                                      </div>
                                  </div>
                                  <div className="extra content">
                                      <span className="right floated">${accessory.price}</span>
                                  </div>
                                  <h4>{accessory.price}</h4>
                                  <AddToCartButton
                                      data={accessory}
                                      userData={userData}
                                      setCartItem={setCartItem}
                                  />
                              </div>
                          ))
                        : accessories.map((accessory, index) => (
                              <div className="card accCard" key={index} style={{background: "none", backgroundColor: "rgba(138,192,240,.8)"}}>
                                  <div className="image" style={{marginRight: "30px"}} >
                                      <img src={n64con} />
                                  </div>
                                  <div className="content">
                                      <div className="header">{accessory.title}</div>
                                      <div className="meta">
                                          <a>Console: {accessory.console}</a>
                                      </div>
                                      <div className="description">
                                        {accessory.description}
                                      </div>
                                  </div>
                                  <div className="extra content">
                                      <span className="floated">${accessory.price}</span>
                                  </div>
                                  <h4></h4>
                                  <AddToCartButton
                                      data={accessory}
                                      userData={userData}
                                      setCartItem={setCartItem}
                                  />
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
};

export default Accessories;