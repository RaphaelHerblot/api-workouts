import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from "../../contexts/AuthContext";

import Profil from '../../pages/Profil';
import CreateWorkout from '../../pages/CreateWorkout';
import UpdateWorkout from '../../pages/UpdateWorkout';
import ShowWorkout from '../../pages/ShowWorkout';
import WorkoutsList from '../Workouts/WorkoutsList';
import Search from '../../pages/Search';
import Calendar from '../../pages/Calendar';
import Home from '../../pages/Home';

const PrivateRoute = ({ path, component, setPageTitle }) => {
    const { isAuthenticated } = useContext(AuthContext);

    const getComponent = (props) => {
        if(component == "Profile") {
            return <Profil {...props} setPageTitle={setPageTitle} />
        } else if (component == "Create") {
            return <CreateWorkout {...props} setPageTitle={setPageTitle} />
        } else if (component == "Show") {
            return <ShowWorkout {...props} setPageTitle={setPageTitle} />
        } else if (component == "Update") {
            return <UpdateWorkout {...props} setPageTitle={setPageTitle} />
        } else if (component == "Home") {
            return <Home {...props} setPageTitle={setPageTitle} />
        } else if (component == "Search") {
            return <Search {...props} setPageTitle={setPageTitle} />
        } else if (component == "Calendar") {
            return <Calendar {...props} setPageTitle={setPageTitle} />
        }
    }
    
    return isAuthenticated ? (
        <Route
            path={path}
            render={(props) => (
                getComponent(props)
            )}
        />
        // getComponent()
    ) : ( 
        <Redirect to="/login" />
    );
}

export default PrivateRoute;