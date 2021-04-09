import React from 'react';
import WorkoutForm from '../../components/Workouts/WorkoutShow/WorkoutForm';

const CreateWorkout = (props) => {
    return ( 
        <div>
            <h1>Créé ta séance de sport</h1>
            <WorkoutForm workoutIsUpdated={false} />
        </div>
    );
}
 
export default CreateWorkout;