import React from 'react';
import { NavLink, withRouter } from "react-router-dom";
import './style.scss';

const Header = ({ pageTitle }) => {
    return (
        <header className="header">
            <div className="header-icon">
                <NavLink to="/">
                    <img src={require("/assets/images/icons/logo-workit.svg")} className="icons-footer" />
                </NavLink>
            </div>
            <div>
                <h2>{pageTitle}</h2>
            </div>
        </header>
    );
}

export default withRouter(Header);