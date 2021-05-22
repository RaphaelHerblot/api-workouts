import React, { useContext } from 'react';
import AuthAPI from "../../services/authAPI";
import { NavLink, withRouter } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import MenuIcon from './MenuIcon';
import './style.scss'

const FooterNavBar = (props) => {
    return (
        <nav className="footer-navbar">
            <ul>
                <li>
                    <NavLink exact activeClassName="active" to="/">
                        <MenuIcon icon="home" />
                        <span>Accueil</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to="/search">
                        <MenuIcon icon="search" />
                        <span>Découvrir</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink  to="/create" className="icon-create">
                        <img src={require("/assets/images/icons/add.svg")} className="icons-footer" />
                    </NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to="/calendar">
                        <MenuIcon icon="calendar" />
                        <span>Agenda</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to="/profil">
                        <MenuIcon icon="profile" />
                        <span>Profil</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default withRouter(FooterNavBar);