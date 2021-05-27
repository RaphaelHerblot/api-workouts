import React, { useEffect, useState} from 'react';
import WorkoutsAPI from "../../../services/workoutsAPI";
import AuthAPI from "../../../services/authAPI";
import WorkoutPreview from './WorkoutPreview';
import { Link } from "react-router-dom";
import TitleWorkit from '../../TitleWorkit';
import WorkoutPreviewLoader from '../../Loader/WorkoutPreviewLoader';

const WorkoutsList = () => {
    const [authenticatedUser, setAuthenticatedUser] = useState([]);
    const [newWorkouts, setNewWorkouts] = useState([]);
    const [mostFavWorkouts, setMostFavWorkouts] = useState([]);
    const [perfectWorkoutsForUser, setPerfectWorkoutsForUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userLoaded, setUserLoaded] = useState(false);

    // Get all workouts
    const fetchWorkouts = async () => {
        try {
            const dataNew = await WorkoutsAPI.findAllByIdDesc();
            const dataFav = await WorkoutsAPI.findAllByMostFav();
            const dataUser = await AuthAPI.findConnectedUser();
            setAuthenticatedUser(dataUser.data);
            setUserLoaded(true);
            setNewWorkouts(dataNew);
            setMostFavWorkouts(dataFav);
            setIsLoading(false);
        } catch(error) {
            console.log(error.response)
        }
    }

    const fetchPerfectWorkouts = async () => {
        try {
            const dataPerfect = await WorkoutsAPI.findPerfectForUser(authenticatedUser.level.id, authenticatedUser.goal.id);
            setPerfectWorkoutsForUser(dataPerfect);
        } catch(error) {
            console.log(error.response)
        }
    }

    // Getting all workouts when component loads
    useEffect(() => {
        fetchWorkouts();
    }, [])

    useEffect(() => {
        if(userLoaded) {
            fetchPerfectWorkouts();
        }
    }, [userLoaded])

    return (
        <div className="workout-list">
            <TitleWorkit title="Séances à la une" icon="heart" />
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

            {perfectWorkoutsForUser.length > 0 
                ?
                <div>
                    <TitleWorkit title="Séances faites pour vous" icon="star" />
                    <div>
                        {perfectWorkoutsForUser.map((workout, index) => 
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
                : ""
            }

            <TitleWorkit title="Nouvelles séances" icon="new" />
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