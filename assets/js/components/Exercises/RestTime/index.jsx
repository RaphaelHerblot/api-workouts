import React from 'react';

import './style.scss';

const RestTime = ({ chosenRest, deleteExercise, nbRepetition, onChange }) => {
    return (
        <div className="restForm">
            <img src={require("/assets/images/icons/rest2.svg")} />
            <div className="rest-informations">
                <input name="exercises" className={chosenRest.id + " exercise-identity"} value={"/api/exercices/" + chosenRest.id} type="hidden"/>
                <input className="exercise-number" required="required" defaultValue={nbRepetition} name="nbRepetition" placeholder="Pause (sec)" type="number" min="1" max="300"/>
            </div>
            <div className="button-container-rest">
                <div className="rest-button">
                    <button type="button" id={"delete_" + chosenRest.id} onClick={() => deleteExercise(event)} className="btn btn-danger deleteExercise">X</button>
                </div>
            </div>
        </div>
    );
}
 
export default RestTime;