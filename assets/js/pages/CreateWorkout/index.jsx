import React, { useEffect } from 'react';
import TitleWorkit from '../../components/TitleWorkit';
import WorkoutForm from '../../components/Workouts/WorkoutShow/WorkoutForm';

// Creating a workout page

const CreateWorkout = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Création de ta séance de sport");
    }, [])

    return ( 
        <div>
            <TitleWorkit title="Créé ta séance" icon="add-orange" />
            <p>C'est ici que tu vas pouvoir créer ta séance comme bon te semble. Libre à toi de choisir les caractéristiques et les exercices que tu souhaites jusqu'à construire la séance de tes rêves !</p>
            <WorkoutForm workoutIsUpdated={false} />
        </div>
    );
}
 
export default CreateWorkout;