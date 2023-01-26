import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    return (
        <Fragment>
            <div className="item">
                <Link className="ui button" to="/">
                    Home
                </Link>
            </div>
            <header className="siteTitle">Retro-R-Us</header>
        </Fragment>
    );
};

export default Header;
