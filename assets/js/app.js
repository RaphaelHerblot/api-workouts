import React, { useContext, useState } from 'react';
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import '../styles/app.scss';
import '../bootstrap';

import HomePage from "./pages/HomePage/HomePage";
import CreateWorkout from './pages/CreateWorkout/CreateWorkout';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import FooterNavBar from "./components/FooterNavBar/FooterNavBar";
import AuthAPI from './services/authAPI';
import WorkoutCard from './components/Workouts/WorkoutCard/WorkoutCard';
import AuthContext from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

AuthAPI.setup();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <div>
                    <div>
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register} />
                            <PrivateRoute path="/create" component={WorkoutCard} />
                            <Route path="/" component={HomePage} />
                        </Switch>
                    </div>
                    <FooterNavBar />
                </div>
            </HashRouter>
        </AuthContext.Provider>

    )
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
