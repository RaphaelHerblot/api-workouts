import React, { useEffect, useState } from 'react';

import LevelsAPI from "../../../services/levelsAPI";
import GoalsAPI from "../../../services/goalsAPI";
import TrainingPlacesAPI from "../../../services/trainingPlacesAPI";
import Field from '../../Form/Field';
import axios from 'axios';
import { USERS_API } from "../../../config";

// Profile update form

const ProfilUpdate = ({ authenticatedUser, updateProfil }) => {
    // User informations
    const[credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        level: "",
        goal: "",
        trainingPlace: ""
    });

    const [error, setError] = useState("");
    const [levels, setLevels] = useState([]);
    const [goals, setGoals] = useState([]);
    const [trainingPlaces, setTrainingPlaces] = useState([]);

    // Fetching the levels, goals and training places for the user to be able to change those
    const fetchWorkouts = async () => {
        try {
            const dataLevels = await LevelsAPI.findAll();
            const dataGoals = await GoalsAPI.findAll();
            const dataTrainingPlaces = await TrainingPlacesAPI.findAll();
            setLevels(dataLevels);
            setGoals(dataGoals);
            setTrainingPlaces(dataTrainingPlaces);
        } catch(error) {
            console.log(error.response)
        }
    }

    // The user informations are saved for each letter added or deleted in each field
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCredentials({...credentials, [name]: value})
    };

    // Form submited
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await axios.put(
                USERS_API + "/" + credentials.id,
                {...credentials,
                    level: `/api/levels/${credentials.level}`,
                    goal: `/api/goals/${credentials.goal}`,
                    trainingPlace: `/api/training_places/${credentials.trainingPlace}`
                }
            );
            updateProfil();

        } catch(error) {
            console.log(error.response);
        }
    }

    // Giving the user informations to the update user form when the component if first render
    useEffect(() => {
        fetchWorkouts();

        const userToUpdate = {
            id: authenticatedUser.id,
            firstName: authenticatedUser.firstName,
            lastName: authenticatedUser.lastName,
            email: authenticatedUser.email,
            level: authenticatedUser.level.id,
            goal: authenticatedUser.goal.id,
            trainingPlace: authenticatedUser.trainingPlace.id
        }
    
        setCredentials(userToUpdate);
    }, [])

    return (
        <div className="updateForm">
            <form onSubmit={handleSubmit}>
                <Field 
                    label="Prénom" 
                    name="firstName" 
                    value={credentials.firstName} 
                    onChange={handleChange} 
                    error={error}
                />
                <Field 
                    label="Nom de famille" 
                    name="lastName" 
                    value={credentials.lastName} 
                    onChange={handleChange} 
                    error={error}
                />
                <Field 
                    label="Adresse mail"
                    type="email"
                    name="email" 
                    value={credentials.email} 
                    onChange={handleChange} 
                    error={error}
                />
                <label>Votre niveau</label>
                {levels.map(level =>
                    <div className="form-check" key={level.id}>
                        <input 
                            value={level.id}
                            onChange={handleChange}
                            type="radio" 
                            id={"level_" + level.id}
                            className="form-check-input"
                            name="level"
                            {...(level.id === credentials.level ? {defaultChecked: true} : null )}
                        />
                        <label htmlFor="level">{level.title}</label>
                    </div>
                )}
                <label>Votre but</label>
                {goals.map(goal => 
                    <div className="form-check" key={goal.id}>
                        <input 
                            value={goal.id} 
                            onChange={handleChange} 
                            type="radio" 
                            id={"goal_" + goal.id}
                            className="form-check-input"
                            name="goal"
                            {...(goal.id === credentials.goal ? {defaultChecked: true} : null )}
                        />
                        <label htmlFor="goal" className="form-check-label">{goal.title}</label>
                    </div>
                )}
                <label>Votre endroit d'entraînement principal</label>
                {trainingPlaces.map(trainingPlace => 
                    <div className="form-check" key={trainingPlace.id}>
                        <input 
                            value={trainingPlace.id}
                            onChange={handleChange} 
                            type="radio"  
                            id={"trainingPlace_" + trainingPlace.id}
                            className="form-check-input"
                            name="trainingPlace"
                            {...(trainingPlace.id === credentials.trainingPlace ? {defaultChecked: true} : null )}
                        />
                        <label htmlFor="trainingPlace">{trainingPlace.place}</label>
                    </div>
                )}
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Modifier
                        <div className="icon-button">
                            <img src={require("/assets/images/icons/straight-right-arrow.svg")} />
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfilUpdate;