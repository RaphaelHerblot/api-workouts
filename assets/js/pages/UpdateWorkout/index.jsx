import React, { useEffect, useState } from 'react';
import WorkoutForm from '../../components/Workouts/WorkoutShow/WorkoutForm';
import WorkoutsAPI from "../../services/workoutsAPI";

const UpdateWorkout = ({ match }) => {
    const [workout, setWorkout] = useState([]);
    const [workoutLoaded, setWorkoutLoaded] = useState(false);

    console.log("THIS IS THE ID : ", match.params.id )

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
        fetchWorkout(match.params.id);
    }, [])

    return ( 
        <div>
            <h1>Modifier votre séance de sport</h1>
            {workoutLoaded ? <WorkoutForm workoutData={workout} workoutIsUpdated={true} /> : null}
        </div>
    );
}
 
export default UpdateWorkout;