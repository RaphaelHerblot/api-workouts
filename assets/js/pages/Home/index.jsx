import React, { useEffect } from 'react';
import WorkoutsList from '../../components/Workouts/WorkoutsList';

// Homepage

const Home = ({ setPageTitle }) => {

    useEffect(() => {
        setPageTitle("Accueil")
    }, [])

    return ( 
        <div>
            <WorkoutsList />
        </div>
    );
}
 
export default Home;