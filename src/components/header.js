import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const categories = ["Consoles", "Games", "Collectibles", "Accessories"];
    const nav = useNavigate();

    return (
        <Fragment>
            <div className="item">
                <Link className="ui inverted primary button" to="/">
                    Home
                </Link>
            </div>
            <div className="item">
                <select className="ui inverted primary button" onChange={(e) => {
                    if (e.target.value === "") {
                        return;
                    }
                    nav(e.target.value)
                    e.target.value = '';
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
        </Fragment>
    );
};

export default Header;
