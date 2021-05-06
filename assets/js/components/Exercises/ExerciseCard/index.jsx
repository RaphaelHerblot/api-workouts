import React from 'react';

const ExerciseCard = ({ exercice, nbRepetition }) => {

    return (
        <li>
            <div><img src={require(`/assets/images/exercices/${exercice.id}.svg`)}></img></div>
            <div><span>x{nbRepetition} </span>{exercice.title}</div>
        </li>
    );
}

export default ExerciseCard;