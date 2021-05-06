import React, { useEffect } from 'react';
import WorkoutForm from '../../components/Workouts/WorkoutShow/WorkoutForm';

const CreateWorkout = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Création de ta séance de sport");
    }, [])

    return ( 
        <div>
            <WorkoutForm workoutIsUpdated={false} />
        </div>
    );
}
 
export default CreateWorkout;