import React, { useEffect, useState } from 'react';
import WorkoutsAPI from "../../../services/workoutsAPI";
import Pagination from '../../Pagination';
import WorkoutPreview from './WorkoutPreview';
import { Link } from "react-router-dom";
import TitleWorkit from '../../TitleWorkit';


const WorkoutsList = ({ setPageTitle }) => {
    const [newWorkouts, setNewWorkouts] = useState([]);
    const [mostFavWorkouts, setMostFavWorkouts] = useState([]);

    // Get all workouts
    const fetchWorkouts = async () => {
        try {
            const dataNew = await WorkoutsAPI.findAllByIdDesc();
            const dataFav = await WorkoutsAPI.findAllByMostFav();
            setNewWorkouts(dataNew);
            setMostFavWorkouts(dataFav);
        } catch(error) {
            console.log(error.response)
        }
    }

    // Getting all workouts when component loads
    useEffect(() => {
        setPageTitle("Accueil")
        fetchWorkouts();
    }, [])

    useEffect(() => {
        console.log("newWorkouts : ", mostFavWorkouts)
    }, [mostFavWorkouts])

    useEffect(() => {
        console.log("newWorkouts : ", newWorkouts)
    }, [newWorkouts])

    return (
        <div className="workout-list">
            <div className="d-flex justify-content-between align-items-center">
                <TitleWorkit title="Les séances à la une" icon="heart" />
            </div>
            <div>
                {mostFavWorkouts.map((workout, index) => 
                    <div key={workout.id}>
                        {index < 2 
                            ?
                            <Link to={"/workout/" + workout.id}>
                                <WorkoutPreview workout={workout} />
                            </Link>
                            : ''
                        }
                    </div>
                )}      
            </div>

            <TitleWorkit title="Les nouvelles séances" icon="new" />

            <div>
                {newWorkouts.map((workout, index) => 
                    <div key={workout.id}>
                        {index < 2 
                            ?
                            <Link to={"/workout/" + workout.id}>
                                <WorkoutPreview workout={workout} />
                            </Link>
                            : ''
                        }
                    </div>
                )}      
            </div>            
        </div>
    );
}

export default WorkoutsList;