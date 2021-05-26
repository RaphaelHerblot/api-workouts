import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LevelsAPI from "../../services/levelsAPI";
import GoalsAPI from "../../services/goalsAPI";
import TrainingPlacesAPI from "../../services/trainingPlacesAPI";
import Field from '../../components/Form/Field';
import axios from 'axios';
import { USERS_API } from "../../config";

const Register = ({ history }) => {
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

    // Fetching the data needed for the user to register
    const fetchUserRequiredData = async () => {
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

    // Handling every value change of each field
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCredentials({...credentials, [name]: value})
    };

    // Submitting the register form
    const handleSubmit = async event => {
        event.preventDefault();
        console.log(credentials);

        try {
            const response = await axios.post(
                USERS_API,
                {...credentials,
                    level: `/api/levels/${credentials.level}`,
                    goal: `/api/goals/${credentials.goal}`,
                    trainingPlace: `/api/training_places/${credentials.trainingPlace}`
                }
            );
            console.log(response.data);
            history.push("/login");
        } catch(error) {
            console.log(error.response);
        }
    }

    // Fetching the user required data when the component is first rendered
    useEffect(() => {
        fetchUserRequiredData();
    }, [])

    return ( 
        <div className="registerForm">
            <form onSubmit={handleSubmit}>
                <h2>Informations Personnelles</h2>

                <div className="register-name">
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
                </div> 

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

                <h2>Choisissons votre plan !</h2>
                <p>Ces informations pourront être changer une fois sur votre profil</p>

                <h3>Mon but est de</h3>
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
                        <label htmlFor={"goal_" + goal.id} className="form-check-label">{goal.title}</label>
                    </div>
                )}
                <h3>Je vais m'entraîner principalement à</h3>
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
                        <label htmlFor={"trainingPlace_" + trainingPlace.id}>{trainingPlace.place}</label>
                    </div>
                )}
                <h3>Mon niveau est</h3>
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
                        <label htmlFor={"level_" + level.id}>{level.title}</label>
                    </div>
                )}
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Inscription
                        <div className="icon-button">
                            <img src={require("/assets/images/icons/straight-right-arrow.svg")} />
                        </div>
                    </button>
                </div>
            </form>
            <p className="login-link">Déjà inscrit ? <Link to="/login">Connexion</Link></p>
        </div>
    );
}
 
export default Register;