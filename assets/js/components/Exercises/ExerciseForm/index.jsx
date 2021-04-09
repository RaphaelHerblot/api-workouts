import React from 'react';

const ExerciseForm = ({ chosenExercise, deleteExercise, nbRepetition, onChange }) => ( 
    <div>
        <img src={require("/assets/images/exercices/" + chosenExercise.id + ".svg")} className="creationImage" />
        <input name="exercises" className={chosenExercise.id + " exercise-identity"} value={"/api/exercices/" + chosenExercise.id} type="hidden"/>
        <input className="exercise-number" required="required" defaultValue={nbRepetition} name="nbRepetition" type="number" min="1" max="99"/>
        <div className="container-form">
            <label>{chosenExercise.title}</label>
            <button type="button" id={"delete_" + chosenExercise.id} onClick={() => deleteExercise(event)} className="btn btn-danger deleteExercise">X</button>
        </div>
    </div>
);
 
export default ExerciseForm;