import React, { useEffect } from 'react';
import TitleWorkit from '../../components/TitleWorkit';
import WorkoutForm from '../../components/Workouts/WorkoutShow/WorkoutForm';

const CreateWorkout = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Création de ta séance de sport");
    }, [])

    return ( 
        <div>
            <TitleWorkit title="Créé ta séance" icon="add-orange" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit , sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
            <WorkoutForm workoutIsUpdated={false} />
        </div>
    );
}
 
export default CreateWorkout;