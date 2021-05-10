import React, { useContext, useState } from 'react';
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import '../styles/app.scss';
import '../bootstrap';

import HomePage from "./pages/HomePage/HomePage";
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import FooterNavBar from "./components/FooterNavBar/FooterNavBar";
import AuthAPI from './services/authAPI';
import AuthContext from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import WorkoutsList from './components/Workouts/WorkoutsList';
import Profil from './pages/Profil';
import UpdateProfil from './components/Profil/ProfilUpdate'
import Header from './components/Header';

AuthAPI.setup();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    const [pageTitle, setPageTitle] = useState("Accueil");

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <div>
                    {isAuthenticated ? <Header pageTitle={pageTitle}/> : "" }
                    <div className="main-content">
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register} />
                            <PrivateRoute path="/create" component="Create" setPageTitle={setPageTitle} />
                            <PrivateRoute path="/workout/:id" component="Show" setPageTitle={setPageTitle} />
                            <PrivateRoute path="/update/:id" component="Update" setPageTitle={setPageTitle} />
                            <PrivateRoute path="/profil" component="Profile" setPageTitle={setPageTitle} />
                            <PrivateRoute path="/" component="WorkoutsList" setPageTitle={setPageTitle} />
                        </Switch>
                    </div>
                    {isAuthenticated ?  <FooterNavBar /> : "" }
                   
                </div>
            </HashRouter>
        </AuthContext.Provider>

    )
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
