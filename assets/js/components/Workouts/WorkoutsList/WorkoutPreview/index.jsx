import React, { useEffect, useState } from 'react';

const WorkoutPreview = ({ workout }) => {
    return (
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
            </div>
        </div>
    );
}

export default WorkoutPreview;