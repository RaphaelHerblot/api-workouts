import React from 'react';
import './style.scss';

// Workout Preview Card

const WorkoutPreview = ({ workout }) => {
    // Giving the right background for the workout preview (Function that is gonna disappear soon enough)
    const getRightBackground = () => {
        let backgroundImage;

        if(workout.level.id === 1) {
            if(workout.goal.id === 1) {
                backgroundImage = "1";
            } else if(workout.goal.id === 2) {
                backgroundImage = "2";
            } else if(workout.goal.id === 3) {
                backgroundImage = "3";
            } else {
                backgroundImage = "4";
            }
        } if(workout.level.id === 2) {
            if(workout.goal.id === 1) {
                backgroundImage = "5";
            } else if(workout.goal.id === 2) {
                backgroundImage = "6";
            } else if(workout.goal.id === 3) {
                backgroundImage = "7";
            } else {
                backgroundImage = "8";
            }
        } if(workout.goal.id === 3) {
            if(workout.goal.id === 1) {
                backgroundImage = "9";
            } else if(workout.goal.id === 2) {
                backgroundImage = "10";
            } else if(workout.goal.id === 3) {
                backgroundImage = "11";
            } else {
                backgroundImage = "12";
            }
        }
        return backgroundImage;
    }

    return (
        <div className="workoutPreview" key={workout.id}>
            <div 
                className="workout-image" 
                style={{backgroundImage: 'linear-gradient(to bottom, rgb(245 246 252 / 0%), #1b1c1d), url('+require("/assets/images/workouts/workout" + getRightBackground() + ".jpg")+')'}}
            >
                <h2>{workout.title}</h2>
                <div>
                    {workout.series} {workout.series == 1 ? 'série' : 'séries'}
                    <span>●</span>
                    {workout.averageTime} min
                </div>
                <div className="workout-likes">
                    {typeof workout.likedUsers !== 'undefined' 
                        ? <p><b>{workout.likedUsers.length}</b></p>
                        : ''
                    }
                    <img src={require('/assets/images/icons/heart-red.svg')} />
                </div>
            </div>
            <div className="workout-exercises">
                {workout.exercices.map((exercice, index) =>
                    <div className={"workout-exercise-"+index} key={exercice.id}>
                        {index < 2 ? 
                            <div className="workout-exercise-detail">
                                <div><img src={require(`/assets/images/exercices/${exercice.id}_white.svg`)}></img></div>
                                <div>x{workout.nbRepetition[index].repetition}</div>
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