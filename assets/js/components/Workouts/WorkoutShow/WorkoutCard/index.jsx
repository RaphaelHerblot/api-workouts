import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import WorkoutsAPI from "../../../../services/workoutsAPI";
import { Link } from "react-router-dom";
import axios from 'axios';
import ExerciseCard from '../../../Exercises/ExerciseCard';
import { USERS_API } from '../../../../config'
import './style.scss';


const WorkoutCard = ({ workout, authenticatedUser, fetchWorkout, idWorkout, fetchUser }) => {
    const[likedWorkouts, setLikedWorkouts] = useState([]);
    const[alreadyLiked, setAlreadyLiked] = useState(false);
    const[addLike, setAddLiked] = useState(0);
    let history = useHistory();

    // Checking if the user has already like that workout when first rendering the component
    useEffect(() => {
        checkAlreadyLiked();
    }, [])

    // Deleting the workout
    const handleDeleteWorkout = async id => {
        try {
            await WorkoutsAPI.delete(id)
            history.push("/profil");
        } catch(error) {
            setWorkouts(originalWorkouts);
        }
    }

    // Liking the workout
    const handleLikeWorkout = async () => {
        (authenticatedUser.likedWorkouts).map(likeWorkout => 
            setLikedWorkouts(likedWorkouts.push("/api/workouts/" + likeWorkout.id))
        )

        const newLikedWorkouts = "/api/workouts/" + workout.id
        setLikedWorkouts(likedWorkouts.push(newLikedWorkouts));

        try {
            const response = await axios.put(
                USERS_API + "/" + authenticatedUser.id, {
                likedWorkouts: likedWorkouts}
            )
            setAlreadyLiked(true);
            fetchWorkout(idWorkout);
            fetchUser();
            setLikedWorkouts([]);
            setAddLiked(addLike + 1);
        } catch(error) {
            console.log(error.response);
        }
    }

    // Unliking a workout
    const handleUnlikeWorkout = async () => {
        const tempLikedWorkouts = likedWorkouts;
        (authenticatedUser.likedWorkouts).map(likeWorkout => {
            if(likeWorkout.id !== workout.id) {
                tempLikedWorkouts.push("/api/workouts/" + likeWorkout.id);
            }
        })

        setLikedWorkouts(tempLikedWorkouts)

        try {
            const response = await axios.put(
                USERS_API + "/" + authenticatedUser.id, {
                likedWorkouts: likedWorkouts}
            )

            setAlreadyLiked(false);
            fetchUser();
            fetchWorkout(idWorkout);
            setLikedWorkouts([]);
            setAddLiked(addLike - 1);
        } catch(error) {
            console.log(error.response);
        }
    }

    // Function that check if the user have already like the workout
    const checkAlreadyLiked = () => {
        authenticatedUser.likedWorkouts.map(likedWorkout => {
            if(workout.id === likedWorkout.id) {
                setAlreadyLiked(true);
            }
        })
    }

    return (
        <div className="workoutCard">
            <div key={workout.id}>
                <div className="workout-likes-container">
                    <p><b>{workout.likedUsers.length + addLike}</b></p>
                    {alreadyLiked 
                        ?  <img src={require('/assets/images/icons/heart-red.svg')} />
                        :  <img src={require('/assets/images/icons/heart-empty.svg')} />
                    }
                    <button type="button" onClick={alreadyLiked ? handleUnlikeWorkout : handleLikeWorkout }>
                        {alreadyLiked ? "Je n'aime plus" : "J'aime !" }
                    </button>
                </div>
                <div className="workout-title">
                    <div>
                        <h2>{workout.title}</h2>
                        <p className="workout-description">{workout.description}</p>
                    </div>
                </div>
                <div className="workout-characteristic">
                    <div>{workout.level.title}</div>
                    <div>{workout.goal.title}</div>
                    <div>{workout.trainingPlace.place}</div>
                </div>
                <div className="workout-informations">
                    <div>
                        <img src={require('/assets/images/icons/dumbbell.svg')} />
                        {workout.equipements}
                    </div>
                    <div>
                        <img src={require('/assets/images/icons/hourglass.svg')} />
                        {workout.averageTime} minutes
                    </div>
                </div>
                <div className="workout-exercices">
                    <h3>Exercices</h3>
                    <h4>{workout.series} séries</h4>
                    <ul>
                        {workout.nbRepetition.map((number) =>
                            <ExerciseCard key={workout.exercices[number.index].id} exercice={workout.exercices[number.index]} nbRepetition={number.repetition} />
                        )}
                    </ul> 
                </div>

                    {authenticatedUser.id === workout.author.id 
                        ?   
                            <div className="button-container"> 
                                <Link to={"/update/" + workout.id}>
                                    <button type="button">Modifier</button>
                                </Link>
                                <div className="delete-container">
                                    <button type="button" onClick={() => handleDeleteWorkout(workout.id)}>
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        : ''
                    }
            </div>
            <div className="button-launch-workout">
                <Link to={"/workingout/" + workout.id}>
                    <button type="button">Commencer</button>
                </Link>
            </div>
        </div>
    );
}

export default WorkoutCard;