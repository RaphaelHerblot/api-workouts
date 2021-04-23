import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

import LevelsAPI from "../../../../services/levelsAPI";
import GoalsAPI from "../../../../services/goalsAPI";
import TrainingPlacesAPI from "../../../../services/trainingPlacesAPI";
import ExercicesAPI from "../../../../services/exercicesAPI";
import Field from '../../../Form/Field';
import Select from '../../../Form/SelectExercise';
import ExerciseForm from '../../../Exercises/ExerciseForm';
import RestTime from '../../../Exercises/RestTime'
import axios from 'axios';

const WorkoutForm = ({ workoutData, workoutIsUpdated }) => {
    const[workout, setWorkout] = useState({
        title: "",
        description: "",
        level: "",
        goal: "",
        trainingPlace: "",
        equipements: "",
        averageTime: "",
        series: "",
        exercices: [],
        nbRepetition: []
    });

    const [error, setError] = useState("");
    const [levels, setLevels] = useState([]);
    const [goals, setGoals] = useState([]);
    const [trainingPlaces, setTrainingPlaces] = useState([]);
    const [exercices, setExercices] = useState([]);
    const [stretches, setStretches] = useState([]);
    const [chosenExercise, setChosenExercise] = useState([]);
    const [rest, setRest] = useState([]);
    const [firstSetupExercices, setFirstSetupExercices] = useState(false);
    const temporaryRest = rest;
    
    useEffect(() => {
        fetchWorkoutsData();
        console.log("WorkoutData : ", workoutData);

        if(workoutIsUpdated) {
            const existingWorkout = {
                id: workoutData.id,
                title: workoutData.title,
                description: workoutData.description,
                level: workoutData.level.id,
                goal: workoutData.goal.id,
                trainingPlace: workoutData.trainingPlace.id,
                equipements: workoutData.equipements,
                averageTime: workoutData.averageTime,
                series: workoutData.series,
                exercices: workoutData.exercices,
                nbRepetition: workoutData.nbRepetition
            }
        
            setWorkout(existingWorkout);
            console.log("existingExercices : ", exercices)

            // for (var i = 0; i < exercices.length; i++) {
            //     console.log(exercices[i].id);
            //     console.log(workout.exercices[i].id);
            //     if(exercices[i].id === workout.exercices[i].id) {
            //         console.log("ntmfdp");
            //         setExercices(exercices.splice(i, 1));
            //     }
            //  }
            console.log("existingWorkout : ", existingWorkout)
        }
    }, [])

    useEffect(() => {
        console.log("Workout : ", workout);
        // if(workoutIsUpdated) {
        //     for (var i = 0; i < workout.exercices.length; i++) {
        //         console.log("BJRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR : ", exercices);
        //         console.log(exercices.filter(exercice => exercice.id !== workout.exercices[i].id));
        //         console.log("LOOOOOOOOOOOLILOOOOOOOOOOOOOOOOOOOOOOOOOOL : ", exercices)
        //     }

        //     // for (var i = 0; i < exercices.length; i++) {
        //     //     for (var j = 0; j < workout.exercices.length; j++) {
        //     //         console.log("lolilol : ", exercices[i].id);
        //     //         console.log("yoyoyoyo : ", workout.exercices[j].id);
        //     //         if(exercices[i].id === workout.exercices[j].id) {
        //     //             console.log("ntmfdp");
        //     //             setExercices(exercices.splice(i, 1));
        //     //         }
        //     //     }
        //     //  }
        //      setFirstSetupExercices(false);
        // }
    }, [workout])

    useEffect(() => {
        console.log("EXOOOOOOOOO : ", exercices);
        console.log("Workout goal : ", workout.goal);
        console.log("Workout goal id : ", goals);
    }, [exercices])

    useEffect(() => {
        console.log("BJR SANA");
        addExerciceToWorkout();
    }, [chosenExercise]);

    // useEffect(() => {
    //     console.log("BJR JENNIE");
    //     addRestToWorkout();
    // }, [needRest]);

    const fetchWorkoutsData = async () => {
        try {
            const dataLevels = await LevelsAPI.findAll();
            const dataGoals = await GoalsAPI.findAll();
            const dataTrainingPlaces = await TrainingPlacesAPI.findAll();
            const dataExercices = await ExercicesAPI.findAllMusculations();
            const dataStretches = await ExercicesAPI.findAllStretches();
            const dataRest = await ExercicesAPI.findOne("36");
            setLevels(dataLevels);
            setGoals(dataGoals);
            setTrainingPlaces(dataTrainingPlaces);
            setFirstSetupExercices(true);
            setExercices(dataExercices);
            setStretches(dataStretches);
            setRest(dataRest.data);
        } catch(error) {
            console.log(error.response)
        }
    }

    const fetchOneExercice = async (event) => {
        try {
            const dataExercice = await ExercicesAPI.findOne(event.target.value);
            setChosenExercise(dataExercice.data);
        } catch(error) {
            console.log(error.response)
        }
    }

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setWorkout({...workout, [name]: value})
    }
    
    const deleteExercise = (event) => {
        console.log(event.target);
        console.log(exercices)
        setExercices(exercices);
        (event.target.parentElement.parentElement.parentElement).remove();
    }

    const deleteStretch = (event) => {
        setStretches(stretches);
        (event.target.parentElement.parentElement.parentElement).remove();
    }

    const deleteRest = (event) => {
        setChosenExercise([]);
        (event.target.parentElement.parentElement.parentElement).remove();
    }

    const addRest = () => {
        setChosenExercise(rest);
        console.log("RESSSSSSSST : ", rest);
    }

    const addExerciceToWorkout = () => {
        console.log("Exercice choisi : ", chosenExercise);
        if(chosenExercise && Object.keys(chosenExercise).length > 0 && chosenExercise.constructor === Object) {
            var listExercicesContainer = document.querySelector(".listExercices");

            var exerciceContainer = document.createElement("div");
            exerciceContainer.setAttribute("id", `content_${chosenExercise.id}`);
            exerciceContainer.setAttribute("class", `container-div`);
            listExercicesContainer.appendChild(exerciceContainer);

            if(chosenExercise.type === "Musculation") {
                ReactDOM.render(<ExerciseForm chosenExercise={chosenExercise} deleteExercise={deleteExercise} />, exerciceContainer);
                setExercices(exercices.filter(exercice => exercice.id !== chosenExercise.id));
            } else if(chosenExercise.type === "Stretch") {
                ReactDOM.render(<ExerciseForm chosenExercise={chosenExercise} deleteExercise={deleteStretch} />, exerciceContainer);
                setStretches(stretches.filter(stretch => stretch.id !== chosenExercise.id))
            } else {
                ReactDOM.render(<RestTime chosenRest={chosenExercise} deleteExercise={deleteRest} />, exerciceContainer);
            }
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();

        var listExercices = document.querySelectorAll('input[type=hidden]');
        var listRepetitions = document.querySelectorAll('.exercise-number');
        workout.exercices = [];
        workout.nbRepetition = [];

        for (var i = 0; i < listExercices.length; i++) {
            console.log("ListExercices : ", listExercices[i].value);
            workout.exercices.push(listExercices[i].value);
            workout.nbRepetition.push(listRepetitions[i].value);
        }

        workout.averageTime = parseInt(workout.averageTime);
        workout.series = parseInt(workout.series);
        event.preventDefault();
        console.log(workout);

        try {
            if(workoutIsUpdated) {
                console.log("YOOOOOO UPDATE");
                const response = await axios.put(
                    "http://localhost:8000/api/workouts/" + workout.id,
                    {...workout,
                        level: `/api/levels/${workout.level}`,
                        goal: `/api/goals/${workout.goal}`,
                        trainingPlace: `/api/training_places/${workout.trainingPlace}`
                    }
                )
                console.log(response.data);
            } else {
                const response = await axios.post(
                    "http://localhost:8000/api/workouts",
                    {...workout,
                        level: `/api/levels/${workout.level}`,
                        goal: `/api/goals/${workout.goal}`,
                        trainingPlace: `/api/training_places/${workout.trainingPlace}`
                    }
                );
            }
    
        } catch(error) {
            console.log(error.response);
        }
    }

    return ( 
        <>
            <form onSubmit={handleSubmit}>
                <Field 
                    label="Nom du workout" 
                    name="title" 
                    value={workout.title} 
                    onChange={handleChange} 
                    error={error}
                />
                <Field 
                    label="Description du workout" 
                    name="description" 
                    value={workout.description} 
                    onChange={handleChange} 
                    error={error}
                />
                <Field 
                    label="Equipement à utiliser" 
                    name="equipements" 
                    value={workout.equipements} 
                    onChange={handleChange} 
                    error={error}
                />
                <Field 
                    type="number" 
                    label="Nombre de série" 
                    name="series" 
                    value={workout.series} 
                    onChange={handleChange} 
                    error={error}
                />
                <Field 
                    type="number" 
                    label="Temps moyen de la séance" 
                    name="averageTime" 
                    value={workout.averageTime} 
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
                            {...(workoutIsUpdated ? (level.id === workoutData.level.id ? {defaultChecked: true} : null ) : null)}
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
                            {...(workoutIsUpdated ? (goal.id === workoutData.goal.id ? {defaultChecked: true} : null ) : null)}
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
                            {...(workoutIsUpdated ? (trainingPlace.id === workoutData.trainingPlace.id ? {defaultChecked: true} : null ) : null)}
                        />
                        <label htmlFor="trainingPlace">{trainingPlace.place}</label>
                    </div>
                )} 
                <label>Les exercices</label>
                <Select name="selectExercices" id="selectExercices" onClickFunction={fetchOneExercice} options={exercices}/>
                <Select name="selectStretches" id="selectExercices" onClickFunction={fetchOneExercice} options={stretches}/>
                <div>
                    <button type="button" onClick={addRest}>Ajouter une pause !</button>
                </div>
                <div className="listExercices">
                    {workoutIsUpdated 
                        ? workout.exercices.map((exercice, index) => 
                            <div key={exercice.id} id={"content_" + exercice.id} className="container-div">
                                {exercice.type === "Musculation" 
                                    ? <ExerciseForm chosenExercise={exercice} nbRepetition={workout.nbRepetition[index]} onChange={handleChange} deleteExercise={deleteExercise} />                                
                                    : <ExerciseForm chosenExercise={exercice} nbRepetition={workout.nbRepetition[index]} onChange={handleChange} deleteExercise={deleteStretch} />                                
                                }
                            </div>
                        )
                        : null
                    }
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">{workoutIsUpdated ? "Modifier" : "Création"}</button>
                </div>
            </form>
        </>
    );
}
 
export default WorkoutForm;