import React, { useState, useEffect } from 'react';
import WorkoutCard from '../../components/Workouts/WorkoutShow/WorkoutCard';
import WorkoutsAPI from "../../services/workoutsAPI";
import AuthAPI from "../../services/authAPI";

const ShowUpdate = ( props ) => {
    const [workout, setWorkout] = useState([]);
    const [workoutLoaded, setWorkoutLoaded] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);

    console.log("IDDDDDDD :", props.match.params.id); 

    // Get the workout by id
    const fetchWorkout = async (idWorkout) => {
        try {
            const data = await WorkoutsAPI.findOne(idWorkout);
            setWorkout(data.data);
            setWorkoutLoaded(true);
        } catch(error) {
            console.log("Error : ", error.response)
        }
    }

    const fetchUser = async () => {
        try {
            const dataUser = await AuthAPI.findConnectedUser();
            setAuthenticatedUser(dataUser.data);
            setUserLoaded(true);
        } catch(error) {
            console.log("Error : ", error.response)
        }
    }

    useEffect(() => {
        fetchWorkout(props.match.params.id);
        fetchUser();
        console.log(workout);
        console.log(props);
    }, [])

    useEffect(() => {
        console.log(authenticatedUser);
    }, [authenticatedUser])

    return ( 
        <div>
            <h1>Séance</h1>
            {workoutLoaded && userLoaded ? <WorkoutCard workout={workout} authenticatedUser={authenticatedUser} /> : null}
        </div>
    );
}
 
export default ShowUpdate;