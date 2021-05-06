import React, { useEffect, useState } from 'react';
import WorkoutsAPI from "../../../../services/workoutsAPI";
import { Link } from "react-router-dom";
import axios from 'axios';
import ExerciseCard from '../../../Exercises/ExerciseCard';


const WorkoutCard = ({ workout, authenticatedUser }) => {
    const[likedWorkouts, setLikedWorkouts] = useState([]);
    const[alreadyLiked, setAlreadyLiked] = useState(false);

    console.log("Bonjour a tous", workout)
    console.log("BJRRR : ", authenticatedUser.likedWorkouts)
 
    useEffect(() => {
        checkAlreadyLiked();
    }, [])

    // Deleting a workout
    const handleDeleteWorkout = async id => {
        try {
            await WorkoutsAPI.delete(id)
        } catch(error) {
            setWorkouts(originalWorkouts);
        }
    }

    const handleLikeWorkout = async () => {
        console.log("TEMAAAAAAAAAAAAAAAAAAAA : ", likedWorkouts);
        (authenticatedUser.likedWorkouts).map(likeWorkout => 
            setLikedWorkouts(likedWorkouts.push("/api/workouts/" + likeWorkout.id))
        )
        console.log(typeof likedWorkouts);
        console.log("YOO HOW IS IT ? : ", likedWorkouts);
        console.log("YOO HOW IS IT 22222222222? : ", likedWorkouts);
        console.log("User :", authenticatedUser.likedWorkouts);
        const newLikedWorkouts = "/api/workouts/" + workout.id
        setLikedWorkouts(likedWorkouts.push(newLikedWorkouts));
        console.log(likedWorkouts)
        try {
            const response = await axios.put(
                "http://localhost:8000/api/users/" + authenticatedUser.id, {
                likedWorkouts: likedWorkouts}
            )
            console.log(response.data);
            setAlreadyLiked(true);
        } catch(error) {
            console.log(error.response);
        }
    }

    const handleUnlikeWorkout = async () => {
        console.log("hello");
        (authenticatedUser.likedWorkouts).map(likeWorkout => {
            if(likeWorkout.id !== workout.id) {
                setLikedWorkouts(likedWorkouts.push("/api/workouts/" + likeWorkout.id))
            }
        })
        try {
            const response = await axios.put(
                "http://localhost:8000/api/users/" + authenticatedUser.id, {
                likedWorkouts: likedWorkouts}
            )
            console.log(response.data);
            setAlreadyLiked(false);
        } catch(error) {
            console.log(error.response);
        }
    }

    const checkAlreadyLiked = () => {
        authenticatedUser.likedWorkouts.map(likedWorkout => {
            if(workout.id === likedWorkout.id) {
                setAlreadyLiked(true);
            }
        })
    }

    return (
        <div className="workoutCard">
            <div>
                <Link to={"/update/" + workout.id}>
                    <button type="button">Modifier</button>
                </Link>
                <button type="button" onClick={alreadyLiked ? handleUnlikeWorkout : handleLikeWorkout }>{alreadyLiked ? "Unlike" : "Like" }</button>
            </div>
            <div>
                <button type="button" onClick={handleDeleteWorkout}>Supprimer</button>
            </div>
            <div key={workout.id}>
                <div>
                    <div>{workout.amountLikes}</div>
                    <div>{workout.amountFavorites}</div>
                </div>
                <h2>{workout.title}</h2>
                <p className="workout-description">{workout.description}</p>
                <div className="workout-characteristic">
                    <div>{workout.level.title}</div>
                    <div>{workout.goal.title}</div>
                    <div>{workout.trainingPlace.place}</div>
                </div>
                <div className="workout-informations">
                    <div>{workout.equipements}</div>
                    <div>{workout.averageTime}</div>
                </div>
                <div className="workout-exercices">
                    <h3>Exercices</h3>
                    <h4>{workout.series} séries</h4>
                    <ul>
                        {workout.exercices.map((exercice, index) =>
                            <ExerciseCard key={exercice.id} exercice={exercice} nbRepetition={workout.nbRepetition[index]} />
                        )}
                    </ul>
                </div>
                <div>
                    <button type="button" onClick={() => handleDelete(workout.id)}>
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WorkoutCard;