import React from 'react';
import Search from './Search';
import AddToCartButton from './AddToCartButton';
import ps2 from "./Product_Images/ps2.png"
import "../style/cards.css"


const Consoles = ({ setCartItem, userData, consoles }) => {
    const [filteredData, setFilteredData] = React.useState ([]);

    return (
        <div className="consolesPage">
            <Search data={consoles} setFilteredData={setFilteredData} />
            <div className="consolesContainer">
                <div className="ui link cards">
                    {filteredData.length > 0
                        ? filteredData.map((console, index) => (
                              <div className="card conCard" key={index} style={{background: "none", backgroundColor: "rgba(138,192,240,.8)"}}>
                                  <div className="image">
                                      <img src="" />
                                  </div>
                                  <div className="content">
                                      <div className="header">{console.title}</div>
                                      <div className="meta">
                                          <a>Year Released: {console.year}</a>
                                      </div>
                                      <div className="description">
                                        {console.description}
                                      </div>
                                  </div>
                                  <div className="extra content">
                                      <span className="right floated">${console.price}</span>
                                  </div>
                                  <h4>{console.price}</h4>
                                  <AddToCartButton
                                      data={console}
                                      userData={userData}
                                      setCartItem={setCartItem}
                                  />
                              </div>
                          ))
                        : consoles.map((console, index) => (
                              <div className="card conCard" key={index} style={{background: "none", backgroundColor: "rgba(138,192,240,.8)"}}>
                                  <div className="image" style={{marginRight: "30px"}} >
                                      <img src={ps2} />
                                  </div>
                                  <div className="content">
                                      <div className="header">{console.title}</div>
                                      <div className="meta">
                                          <a>Year Released: {console.year}</a>
                                      </div>
                                      <div className="description">
                                        {console.description}
                                      </div>
                                  </div>
                                  <div className="extra content">
                                      <span className="floated">${console.price}</span>
                                  </div>
                                  <h4></h4>
                                  <AddToCartButton
                                      data={console}
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

export default Consoles;