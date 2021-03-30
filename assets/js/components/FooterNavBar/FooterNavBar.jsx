import React, { useContext } from 'react';
import AuthAPI from "../../services/authAPI";
import { NavLink, withRouter } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const FooterNavBar = ({ history }) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        history.push("/login");
    }

    return (
        <nav className="footer-navbar">
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                {!isAuthenticated && (
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                )}  
                <li>
                    <NavLink to="/create">Créer</NavLink>
                </li>
                {isAuthenticated && (
                    <li>
                        <a onClick={handleLogout}>Deconnexion</a>
                    </li>
                )}
                <li>
                    <NavLink to="/profil">Profil</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default withRouter(FooterNavBar);