import React, { useState, useEffect } from 'react';

import LevelsAPI from "../../services/levelsAPI";
import GoalsAPI from "../../services/goalsAPI";
import TrainingPlacesAPI from "../../services/trainingPlacesAPI";
import Field from '../../components/Form/Field';
import axios from 'axios';

const Register = (props) => {
    const[credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        level: "",
        goal: "",
        trainingPlace: ""
    });

    const [error, setError] = useState("");
    const [levels, setLevels] = useState([]);
    const [goals, setGoals] = useState([]);
    const [trainingPlaces, setTrainingPlaces] = useState([]);

    const fetchWorkouts = async () => {
        try {
            const dataLevels = await LevelsAPI.findAll();
            const dataGoals = await GoalsAPI.findAll();
            const dataTrainingPlaces = await TrainingPlacesAPI.findAll();
            setLevels(dataLevels);
            setGoals(dataGoals);
            setTrainingPlaces(dataTrainingPlaces);
            console.log(levels);
        } catch(error) {
            console.log(error.response)
        }
    }

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCredentials({...credentials, [name]: value})
    };

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(credentials);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/users",
                {...credentials,
                    level: `/api/levels/${credentials.level}`,
                    goal: `/api/goals/${credentials.goal}`,
                    trainingPlace: `/api/training_places/${credentials.trainingPlace}`
                }
            );
            console.log(response.data);
        } catch(error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchWorkouts();
    }, [])

    return ( 
        <>
            <h1>Inscription</h1>

            <form onSubmit={handleSubmit}>
                <Field 
                    label="Prénom" 
                    name="firstName" 
                    value={credentials.firstname} 
                    onChange={handleChange} 
                    error={error}
                />
                <Field 
                    label="Nom de famille" 
                    name="lastName" 
                    value={credentials.lastname} 
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
                <Field 
                    label="Mot de passe"
                    type="password"
                    name="password" 
                    value={credentials.password} 
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
                        />
                        <label htmlFor="trainingPlace">{trainingPlace.place}</label>
                    </div>
                )}
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Inscription</button>
                </div>
            </form>
        </>
    );
}
 
export default Register;