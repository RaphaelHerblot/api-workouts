import React from 'react';

import './style.scss';

const ExerciseForm = ({ chosenExercise, deleteExercise, nbRepetition, onChange, index }) => ( 
    <div className="exerciseForm">
        <img src={require("/assets/images/exercices/" + chosenExercise.id + "_white.svg")} className="creationImage" />
        <div className="exercise-informations">
            <label>{chosenExercise.title}</label>
            <input name="exercises" className={chosenExercise.id + " exercise-identity"} value={"/api/exercices/" + chosenExercise.id} type="hidden"/>
            <input className="exercise-number" required="required" placeholder={chosenExercise.type === "Musculation" ? "Nombre de répétition" : "Secondes" } defaultValue={nbRepetition} name="nbRepetition" type="number" min="1" max="99"/>
        </div>
        <div className="button-container-exercices">
            <div className="exercise-button">
                <button type="button" id={"delete_" + chosenExercise.id} onClick={(event) => deleteExercise(event, index)} className="btn btn-danger deleteExercise">
                    <img src={require("/assets/images/icons/cross.svg")} className="icons-footer" />
                </button>
            </div>
        </div>
    </div>
);
 
export default ExerciseForm;