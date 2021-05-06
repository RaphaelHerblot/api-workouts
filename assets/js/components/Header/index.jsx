import React, { useContext } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const Header = ({ pageTitle }) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    return (
        <header className="header">
            <div className="header-icon">
                <NavLink to="/">
                    <img src={require("/assets/images/icons/weight.svg")} className="icons-footer" />
                </NavLink>
            </div>
            <div>
                <h2>{pageTitle}</h2>
            </div>
        </header>
    );
}

export default withRouter(Header);