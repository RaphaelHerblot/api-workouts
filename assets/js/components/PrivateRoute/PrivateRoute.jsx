import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from "../../contexts/AuthContext";

import Profil from '../../pages/Profil';
import CreateWorkout from '../../pages/CreateWorkout';
import UpdateWorkout from '../../pages/UpdateWorkout';
import ShowWorkout from '../../pages/ShowWorkout';
import WorkoutsList from '../Workouts/WorkoutsList';
import Search from '../../pages/Search';

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
        } else if (component == "WorkoutsList") {
            return <WorkoutsList {...props} setPageTitle={setPageTitle} />
        } else if (component == "Search") {
            return <Search {...props} setPageTitle={setPageTitle} />
        }
        // if(component == "Profile" ) {
        //     return (
        //         <Route
        //             path={path}
        //             render={(props) => (
        //                 <Profil {...props} setPageTitle={setPageTitle} />
        //             )}
        //         />
        //     )
        // } else if((component == "Create" )) {
        //     return (
        //         <Route
        //             path={path}
        //             render={(props) => (
        //                 <CreateWorkout {...props} setPageTitle={setPageTitle} />
        //             )}
        //         />
        //     )
        // } 
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