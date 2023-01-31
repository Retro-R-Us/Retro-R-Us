import React from 'react';
import Search from './Search';
import AddToCartButton from './AddToCartButton';
import DK from "./Product_Images/DonkeyKong.png"
import "../style/cards.css"

const Games = ({setCartItem, games, userData }) => {
    const [filteredData, setFilteredData] = React.useState([]);


    return (    
        <div className="gamesPage">
            <Search data={games} setFilteredData={setFilteredData} />
            <div className="gamesContainer">
                <div className="ui link cards">
                    {filteredData.length > 0
                        ? filteredData.map((game, index) => (
                              <div className="card gameCard" key={index} style={{background: "none", backgroundColor: "rgba(138,192,240,.8)"}}>
                                  <div className="image">
                                      <img src="" />
                                  </div>
                                  <div className="content">
                                      <div className="header">{game.title}</div>
                                      <div className="meta">
                                          <a>Console: {game.console}</a>
                                      </div>
                                      <div className="meta">
                                          <a>Year Released: {game.year}</a>
                                      </div>
                                      <div className="description">
                                        {game.description}
                                      </div>
                                  </div>
                                  <div className="extra content">
                                      <span className="right floated">${game.price}</span>
                                  </div>
                                  <h4>{game.price}</h4>
                                  <AddToCartButton
                                      data={game}
                                      userData={userData}
                                      setCartItem={setCartItem}
                                  />
                              </div>
                          ))
                        : games.map((game, index) => (
                              <div className="card gameCard" key={index} style={{background: "none", backgroundColor: "rgba(138,192,240,.8)"}}>
                                  <div className="image" style={{marginRight: "30px"}} >
                                      <img src={DK} />
                                  </div>
                                  <div className="content">
                                      <div className="header">{game.title}</div>
                                      <div className="meta">
                                          <a>Console: {game.console}</a>
                                      </div>
                                      <div className="meta">
                                          <a>Year Released: {game.year}</a>
                                      </div>
                                      <div className="description">
                                        {game.description}
                                      </div>
                                  </div>
                                  <div className="extra content">
                                      <span className="floated">${game.price}</span>
                                  </div>
                                  <h4></h4>
                                  <AddToCartButton
                                      data={game}
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

export default Games;


