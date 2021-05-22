import React, { useState, useEffect } from 'react';
import WorkoutCard from '../../components/Workouts/WorkoutShow/WorkoutCard';
import WorkoutsAPI from "../../services/workoutsAPI";
import AuthAPI from "../../services/authAPI";
import ThreeDotsLoader from '../../components/Loader/ThreeDotsLoader';

const ShowUpdate = ({ match, setPageTitle }) => {
    const [workout, setWorkout] = useState([]);
    const [workoutLoaded, setWorkoutLoaded] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);

    console.log("IDDDDDDD :", match.params.id); 

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
        setPageTitle("Détail de la séance")
        fetchWorkout(match.params.id);
        fetchUser();
    }, [])

    useEffect(() => {
        console.log(authenticatedUser);
    }, [authenticatedUser])

    return ( 
        <div>
            {workoutLoaded && userLoaded 
                ? <WorkoutCard workout={workout} authenticatedUser={authenticatedUser} /> 
                :        
                    <div className="workout-loading">
                        <ThreeDotsLoader />
                    </div>
            }
        </div>
    );
}
 
export default ShowUpdate;