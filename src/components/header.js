import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const categories = ["Consoles", "Games", "Collectibles", "Accessories"];
    const nav = useNavigate();

    return (
        <Fragment>
            <div className="item">
                <Link className="ui button" to="/">
                    Home
                </Link>
            </div>
            <div className="item">
                <select className="ui button" onChange={(e) => {
                    console.log(e.target.value)
                    if (e.target.value === "") {
                        return;
                    }
                    nav(e.target.value)
                }}>
                    <option value="">Browse</option>
                    {categories.map((cat, index) => {
                        return (
                            <option value={cat} key={index}>
                                {cat}
                            </option>
                        )
                    })}
                </select>
            </div>
            <header className="siteTitle">Retro-R-Us</header>
        </Fragment>
    );
};

export default Header;
