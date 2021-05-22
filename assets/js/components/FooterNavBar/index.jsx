import React, { useContext } from 'react';
import AuthAPI from "../../services/authAPI";
import { NavLink, withRouter } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import './style.scss'

const FooterNavBar = ({ history }) => {
    return (
        <nav className="footer-navbar">
            <ul>
                <li>
                    <NavLink exact activeClassName="active" to="/">
                        <img src={require("/assets/images/icons/home.svg")} className="icons-footer" />
                        <span>Accueil</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to="/search">
                        <img src={require("/assets/images/icons/loupe.svg")} className="icons-footer" />
                        <span>Découvrir</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to="/create" className="icon-create">
                        <img src={require("/assets/images/icons/add.svg")} className="icons-footer" />
                    </NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to="/calendar">
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