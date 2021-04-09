import React, { useEffect, useState } from 'react';
import WorkoutsAPI from "../../../../services/workoutsAPI";
import { Link } from "react-router-dom";


const WorkoutCard = ({ workout }) => {
    console.log("Bonjour a tous", workout)
    // Deleting a workout
    const handleDeleteWorkout = async id => {
        try {
            await WorkoutsAPI.delete(id)
        } catch(error) {
            setWorkouts(originalWorkouts);
        }
    }

    const like = () => {
        
    }

    return (
        <div>
            <div>
                <Link to={"/update/" + workout.id}>
                    <button type="button">Modifier</button>
                </Link>
                <button type="button" onClick={like}>Like</button>
            </div>
            <div>
                <button type="button" onClick={handleDeleteWorkout}>Supprimer</button>
            </div>
            <div className="workoutCard" key={workout.id}>
                <div>
                    <div>{workout.amountLikes}</div>
                    <div>{workout.amountFavorites}</div>
                </div>
                <h2>{workout.title}</h2>
                <div>
                    <div>{workout.level.title}</div>
                    <div>{workout.goal.title}</div>
                    <div>{workout.trainingPlace.place}</div>
                </div>
                <div>{workout.description}</div>
                <div>
                    <div>{workout.averageTime}</div>
                    <div>{workout.series}</div>
                </div>
                <div>
                    <ul>
                        {workout.exercices.map(exercice =>
                            <li key={exercice.id}>
                                <div><img src={require(`/assets/images/exercices/${exercice.id}.svg`)}></img></div>
                                <div>{exercice.title}</div>
                            </li>
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