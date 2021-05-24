import React from 'react';

import './style.scss';

const RestTime = ({ chosenRest, deleteExercise, nbRepetition, onChange, index }) => {
    return (
        <div className="restForm">
            <img src={require("/assets/images/icons/rest2.svg")} />
            <div className="rest-informations">
                <input name="exercises" className={chosenRest.id + " exercise-identity"} value={"/api/exercices/" + chosenRest.id} type="hidden"/>
                <input className="exercise-number" required="required" defaultValue={nbRepetition} name="nbRepetition" placeholder="Pause (sec)" type="number" min="1" max="300"/>
            </div>
            <div className="button-container-rest">
                <div className="rest-button">
                    <button type="button" id={"delete_" + chosenRest.id} onClick={(event) => deleteExercise(event, index)} className="btn btn-danger deleteExercise">
                        <img src={require("/assets/images/icons/cross.svg")} className="icons-footer" />
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default RestTime;