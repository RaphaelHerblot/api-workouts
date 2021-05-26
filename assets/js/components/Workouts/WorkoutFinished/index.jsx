import React from 'react';
import { Link } from "react-router-dom";
import './style.scss';

// Page shown when workout is over

const WorkingFinished = ({ workoutTitle }) => {

    return ( 
        <div className="workout-finished">
            <h3>
                Bien joué ! La séance <span>{workoutTitle}</span> est terminée, on se retrouve pour la prochaine très bientôt.
            </h3>
                <div className="button-finish-workout">
                    <Link to="/profil">
                        <button type="button" className="button-workout-finished">
                            Enregistrer l'entraînement
                        </button>
                     </Link>
                </div>
        </div>
    );
}
 
export default WorkingFinished;