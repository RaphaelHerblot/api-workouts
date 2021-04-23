import React from 'react';

const RestTime = ({ chosenRest, deleteExercise, nbRepetition, onChange }) => {
    return (
        <div>
            <input name="exercises" className={chosenRest.id + " exercise-identity"} value={"/api/exercices/" + chosenRest.id} type="hidden"/>
            <input className="exercise-number" required="required" defaultValue={nbRepetition} name="nbRepetition" type="number" min="1" max="300"/>
            <div className="container-form">
                <label>{chosenRest.title}</label>
                <button type="button" id={"delete_" + chosenRest.id} onClick={() => deleteExercise(event)} className="btn btn-danger deleteExercise">X</button>
            </div>
        </div>
    );
}
 
export default RestTime;