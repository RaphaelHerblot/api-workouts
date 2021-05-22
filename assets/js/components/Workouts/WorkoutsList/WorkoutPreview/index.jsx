import React from 'react';
import './style.scss';

const WorkoutPreview = ({ workout }) => {
    return (
        <div className="workoutPreview" key={workout.id}>
            <div className="workout-image" style={{backgroundImage: 'linear-gradient(to bottom, rgb(245 246 252 / 0%), #1b1c1d), url('+require("/assets/images/workouts/workout1.jpg")+')'}}>
                <h2>{workout.title}</h2>
                <div>
                    {workout.series} {workout.series == 1 ? 'série' : 'séries'}
                    <span>●</span>
                    {workout.averageTime} min
                </div>
                <div className="workout-likes">
                    <p><b>{workout.likedUsers.length}</b></p>
                    <img src={require('/assets/images/icons/heart-red.svg')} />
                </div>
            </div>
            <div className="workout-exercises">
                {workout.exercices.map((exercice, index) =>
                    <div className={"workout-exercise-"+index} key={exercice.id}>
                        {index < 2 ? 
                            <div className="workout-exercise-detail">
                                <div><img src={require(`/assets/images/exercices/${exercice.id}_white.svg`)}></img></div>
                                <div>x{workout.nbRepetition[index]}</div>
                                <div>{exercice.title}</div>
                            </div>
                        : '' }
                    </div>
                )}
            </div>
            <div>
            </div>
        </div>
    );
}

export default WorkoutPreview;