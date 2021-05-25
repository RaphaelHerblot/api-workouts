import React, { useState, useEffect } from 'react';
import './style.scss';

const ExercisePreview = ({ exercise }) => {

    useEffect(() => {
        console.log(exercise)
    }, [])

    return ( 
        <div className="exercise-preview">
           HI
        </div>
    );
}
 
export default ExercisePreview;