import React, { useEffect } from 'react';
import WorkoutsList from '../../components/Workouts/WorkoutsList';
import "./style.scss";

// Homepage

const Home = ({ setPageTitle }) => {

    useEffect(() => {
        setPageTitle("Accueil")
    }, [])

    return ( 
        <div className="home-page">
            <img src={require("/assets/images/workit.svg")} className="workit-mark"/>
            <WorkoutsList />
        </div>
    );
}
 
export default Home;