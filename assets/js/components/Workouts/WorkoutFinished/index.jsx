import React from 'react';
import { Link } from "react-router-dom";
import './style.scss';

const WorkingFinished = (props) => {

    return ( 
        <div className="workout-finished">
            <h3>
                Bien joué ! La séance est terminée, continue comme ça tu es le meilleur
            </h3>
            <Link to="/profile">
                <div className="button-container">
                    <button type="button" className="button-workout-finished">
                        Enregistrer l'entraînement
                    </button>
                </div>
            </Link>
        </div>
    );
}
 
export default WorkingFinished;