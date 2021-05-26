import React from 'react';
import './style.scss';

// Card of an exercise

const ExerciseCard = ({ exercice, nbRepetition }) => {
    return (
        <li className="exercise-card">
            <div><img src={require(`/assets/images/exercices/${exercice.id}.svg`)} className="exercise-image"/></div>
            { exercice.type !== 'Musculation'
                ?   
                    <div>
                        <img src={require("/assets/images/icons/rest2-black.svg")} className="icon-rest" />
                        {exercice.title} <span>{nbRepetition}s</span>
                    </div>
                : <div>x{nbRepetition} <span>{exercice.title}</span></div>
            }
        </li>
    );
}

export default ExerciseCard;