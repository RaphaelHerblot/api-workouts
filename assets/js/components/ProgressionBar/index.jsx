import React, { useEffect } from 'react';
import './style.scss';

const ProgressionBar = ({ percentProgression, numberTotalOfExercises, progression }) => {
    const elements = []

    /* Array of the div equal to the total number of exercises in the workout
    Giving the active class to exercise div that are already done */
    for(let i = 0 ; i < numberTotalOfExercises ; i++ ) {
        elements.push(<div key={i} className={progression < i+1 ? "progression-bloc" : "progression-bloc active"}></div>);
    }

    return ( 
        <div className="progression-container">
            <div className="progression-percent"><b>{percentProgression}%</b></div>
            <div className="progression-bar">
                {elements.map(bloc =>
                    bloc
                )}
            </div>
        </div>
    );
}
 
export default ProgressionBar;