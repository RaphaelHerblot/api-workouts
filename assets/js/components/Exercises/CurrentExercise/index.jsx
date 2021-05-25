import React, { useState, useEffect } from 'react';
import ProgressionTime from '../../ProgressionTime';
import './style.scss';

const CurrentExercise = ({ exercise, currentTime, handleNextStep, time, percentTime }) => {
    console.log("currentTime : ", currentTime);

    return ( 
        <div className="current-exercise">
            <div className="current-exercise-image">
                <img src={require("/assets/images/exercices/" + exercise.id + "_white.svg")} />
            </div>
            <div className="current-exercise-informations">
                <div>
                    <h3>{currentTime}<span>{exercise.type === "Musculation" ? "x" : "s" }</span></h3>
                    <p>{exercise.title}</p>
                </div>
                {exercise.type !== "Musculation" 
                ? <ProgressionTime percentTime={percentTime} />
                : "" 
            }
            </div>
            <div className="arrow-icon" onClick={handleNextStep}>
                <span className="left-bar"></span>
                <span className="right-bar"></span>
            </div>
        </div>
    );
}
 
export default CurrentExercise;