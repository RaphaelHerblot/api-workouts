import React, { useState, useEffect } from 'react';

import LevelsAPI from "../../services/levelsAPI";
import GoalsAPI from "../../services/goalsAPI";
import TrainingPlacesAPI from "../../services/trainingPlacesAPI";

const Register = (props) => {
    const[credentials, setCredentials] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        level: "",
        goal: "",
        trainingPlace: ""
    });
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

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value})
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(credentials);
    }

    useEffect(() => {
        fetchWorkouts();
    }, [])

    return ( 
        <>
            <h1>Inscription</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstname">Prénom</label>
                    <input 
                        value={credentials.firstname} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder="Prénom" 
                        id="firstname" 
                        name="firstname" 
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Nom de famille</label>
                    <input 
                        value={credentials.lastname} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder="Nom de famille" 
                        id="lastname" 
                        name="lastname" 
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Adresse mail</label>
                    <input 
                        value={credentials.username} 
                        onChange={handleChange} 
                        type="email" 
                        placeholder="Adresse email de connexion" 
                        id="username" 
                        name="username" 
                        className="form-control"
                    />
                </div>
                <div className="form-check">
                    <input 
                        value={credentials.password} 
                        onChange={handleChange} 
                        type="password" 
                        placeholder="Mot de passe" 
                        id="password" 
                        className="form-control"
                        className="form-check-input"
                    />
                    <label htmlFor="password">Mot de passe</label>
                </div>
                <label>Votre niveau</label>
                {levels.map(level => 
                    <div className="form-check" key={level.id}>
                        <input 
                            value={credentials.level} 
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
                            value={credentials.goal} 
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
                            value={credentials.trainingPlace} 
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