import React, { useState, useEffect } from 'react';
import WorkoutCard from '../../components/Workouts/WorkoutShow/WorkoutCard';
import WorkoutsAPI from "../../services/workoutsAPI";

const ShowUpdate = ( props ) => {
    const [workout, setWorkout] = useState([]);
    const [workoutLoaded, setWorkoutLoaded] = useState(false);

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

    useEffect(() => {
        fetchWorkout(props.match.params.id);
        console.log(workout);
        console.log(props);
    }, [])

    return ( 
        <div>
            <h1>Séance</h1>
            {workoutLoaded ? <WorkoutCard workout={workout} /> : null}
        </div>
    );
}
 
export default ShowUpdate;