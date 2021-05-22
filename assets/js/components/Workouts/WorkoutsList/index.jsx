import React, { useEffect, useState } from 'react';
import WorkoutsAPI from "../../../services/workoutsAPI";
import WorkoutPreview from './WorkoutPreview';
import { Link } from "react-router-dom";
import TitleWorkit from '../../TitleWorkit';
import WorkoutPreviewLoader from '../../Loader/WorkoutPreviewLoader';

const WorkoutsList = () => {
    const [newWorkouts, setNewWorkouts] = useState([]);
    const [mostFavWorkouts, setMostFavWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Get all workouts
    const fetchWorkouts = async () => {
        try {
            const dataNew = await WorkoutsAPI.findAllByIdDesc();
            const dataFav = await WorkoutsAPI.findAllByMostFav();
            setNewWorkouts(dataNew);
            setMostFavWorkouts(dataFav);
            setIsLoading(false);
        } catch(error) {
            console.log(error.response)
        }
    }

    // Getting all workouts when component loads
    useEffect(() => {
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
            <TitleWorkit title="Les séances à la une" icon="heart" />
            {isLoading 
                ? 
                    <div>
                        <WorkoutPreviewLoader />
                        <WorkoutPreviewLoader />
                    </div>
                : 
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
            }

            <TitleWorkit title="Les nouvelles séances" icon="new" />

            {isLoading 
                ? 
                    <div>
                        <WorkoutPreviewLoader />
                        <WorkoutPreviewLoader />
                    </div>
                : 
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
            }        
        </div>
    );
}

export default WorkoutsList;