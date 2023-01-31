import React from 'react';
import Search from './Search';
import AddToCartButton from './AddToCartButton';
import MCPlush from "./Product_Images/Master-Chief-Plush.png"
import "../style/search.css"

const Collectibles = ({setCartItem, userData, collectibles }) => {
    const [filteredData, setFilteredData] = React.useState([]);

    return (
        <div className="collectiblesPage">
            <Search data={collectibles} setFilteredData={setFilteredData} />
            <div className="collectiblesContainer">
                <div className="ui link cards">
                    {filteredData.length > 0
                        ? filteredData.map((collectible, index) => (
                              <div className="card collCard" key={index} style={{background: "none", backgroundColor: "rgba(138,192,240,.8)"}}>
                                  <div className="image">
                                      <img src="" />
                                  </div>
                                  <div className="content">
                                      <div className="header">{collectible.title}</div>
                                      <div className="meta">
                                          <a>Associated Console: {collectible.console}</a>
                                      </div>
                                      <div className="description">
                                        {collectible.description}
                                      </div>
                                  </div>
                                  <div className="extra content">
                                      <span className="right floated">${collectible.price}</span>
                                  </div>
                                  <h4>{collectible.price}</h4>
                                  <AddToCartButton
                                      data={collectible}
                                      userData={userData}
                                      setCartItem={setCartItem}
                                  />
                              </div>
                          ))
                        : collectibles.map((collectible, index) => (
                              <div className="card collCard" key={index} style={{background: "none", backgroundColor: "rgba(138,192,240,.8)"}}>
                                  <div className="image" style={{marginRight: "30px"}} >
                                      <img src={MCPlush} />
                                  </div>
                                  <div className="content">
                                      <div className="header">{collectible.title}</div>
                                      <div className="meta">
                                          <a>Associated Console: {collectible.console}</a>
                                      </div>
                                      <div className="description">
                                        {collectible.description}
                                      </div>
                                  </div>
                                  <div className="extra content">
                                      <span className="floated">${collectible.price}</span>
                                  </div>
                                  <h4></h4>
                                  <AddToCartButton
                                      data={collectible}
                                      userData={userData}
                                      setCartItem={setCartItem}
                                  />
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
}    

export default Collectibles;


