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
                    <NavLink to="/">
                        <img src={require("/assets/images/icons/home.svg")} className="icons-footer" />
                        <span>Accueil</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login">
                        <img src={require("/assets/images/icons/loupe.svg")} className="icons-footer" />
                        <span>Découvrir</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/create" className="icon-create">
                        <img src={require("/assets/images/icons/add.svg")} className="icons-footer" />
                    </NavLink>
                </li>
                {/* {isAuthenticated && (
                    <li>
                        <a onClick={handleLogout}>Deconnexion</a>
                    </li>
                )} */}
                <li>
                    <NavLink to="/profil">
                        <img src={require("/assets/images/icons/calendar.svg")} className="icons-footer" />
                        <span>Agenda</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profil">
                        <img src={require("/assets/images/icons/profile.svg")} className="icons-footer" />
                        <span>Profil</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default withRouter(FooterNavBar);