import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

import LevelsAPI from "../../../../services/levelsAPI";
import GoalsAPI from "../../../../services/goalsAPI";
import TrainingPlacesAPI from "../../../../services/trainingPlacesAPI";
import ExercicesAPI from "../../../../services/exercicesAPI";
import Field from '../../../Form/Field';
import FieldTextarea from '../../../Form/FieldTextarea';
import Select from '../../../Form/SelectExercise';
import ExerciseForm from '../../../Exercises/ExerciseForm';
import RestTime from '../../../Exercises/RestTime'
import axios from 'axios';

import './style.scss';
import SearchBar from '../../../SearchBar/SearchBarExercises';

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
    const [modTypeExercise, setModTypeExercise] = useState("exercises");
    const [modSearchExercise, setModSearchExercise] = useState("search");
    const [exercisesToSearch, setExercisesToSearch] = useState([])
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
        console.log("BJR LOLILOLILOL", event.target)
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

    const handleTypeMod = (event) => {
        if(modTypeExercise === "exercises") {
            setModTypeExercise("stretching");
        } else {
            setModTypeExercise("exercises");
        }
                    
        if(event.target.classList[0] === "button-type-stretching") {
            event.target.classList.toggle("active");
            event.target.previousSibling.classList.toggle("active");
        } else if (event.target.classList[0] === "button-type-exercise") {
            event.target.classList.toggle("active");
            event.target.nextSibling.classList.toggle("active");
        }
    }

    const handleSearchMod = (event) => {
        if(modSearchExercise === "search") {
            setModSearchExercise("list");
        } else {
            setModSearchExercise("search");
        }
                    
        if(event.target.classList[0] === "button-list") {
            event.target.classList.toggle("active");
            event.target.previousSibling.classList.toggle("active");
        } else if (event.target.classList[0] === "button-search") {
            event.target.classList.toggle("active");
            event.target.nextSibling.classList.toggle("active");
        }
    }
    
    const deleteExercise = (event) => {
        console.log(event.target);
        console.log(exercices)
        setExercices(exercices);
        (event.target.parentElement.parentElement.parentElement.parentElement.parentElement).remove();
    }

    const deleteStretch = (event) => {
        setStretches(stretches);
        (event.target.parentElement.parentElement.parentElement.parentElement.parentElement).remove();
    }

    const deleteRest = (event) => {
        setChosenExercise([]);
        (event.target.parentElement.parentElement.parentElement.parentElement).remove();
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
                // setExercices(exercices.filter(exercice => exercice.id !== chosenExercise.id));
            } else if(chosenExercise.type === "Stretch") {
                ReactDOM.render(<ExerciseForm chosenExercise={chosenExercise} deleteExercise={deleteStretch} />, exerciceContainer);
                // setStretches(stretches.filter(stretch => stretch.id !== chosenExercise.id))
            } else {
                console.log("RESST TIME");
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
        <div className="workoutForm">
            <form onSubmit={handleSubmit}>
                <Field 
                    label="Nom du workout" 
                    name="title" 
                    value={workout.title} 
                    onChange={handleChange} 
                    error={error}
                />
                <FieldTextarea 
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
                <h3>Le niveau recommandé est</h3>
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
                        <label htmlFor={"level_" + level.id}>{level.title}</label>
                    </div>
                )}
                <h3>Le but de la séance est de</h3>
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
                        <label htmlFor={"goal_" + goal.id} className="form-check-label">{goal.title}</label>
                    </div>
                )}
                <h3>La séance doit s'effectuer à</h3>
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
                        <label htmlFor={"trainingPlace_" + trainingPlace.id}>{trainingPlace.place}</label>
                    </div>
                )} 
                <h2>Exercices</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit , sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                {exercices.length > 0 
                    ? 
                        <div>
                            <div className="button-container">
                                <div className="button-type-exercises">
                                    <button type="button" className="button-type-exercise active" onClick={handleTypeMod}>
                                        Exercices
                                    </button>
                                    <button type="button" className="button-type-stretching" onClick={handleTypeMod}>
                                        Étirements
                                    </button>
                                </div>
                                <div className="button-find-exercises">
                                    <button type="button" className="button-search active" onClick={handleSearchMod}>
                                        Rechercher
                                    </button>
                                    <button type="button" className="button-list" onClick={handleSearchMod}>
                                        Liste
                                    </button>
                                </div>
                            </div>
                            {modSearchExercise === "search" 
                                ? 
                                    ( modTypeExercise === "exercises" 
                                        ? <SearchBar exercises={exercices} onClickFunction={fetchOneExercice} placeholder="Recherchez un exercice" />
                                        : <SearchBar exercises={stretches} onClickFunction={fetchOneExercice} placeholder="Recherchez un étirement" />
                                    )
                                : 
                                    ( modTypeExercise === "exercises" 
                                        ? <Select name="selectExercices" id="selectExercices" onClickFunction={fetchOneExercice} options={exercices} placeholder="Choisissez vos exercices"/>
                                        : <Select name="selectStretches" id="selectExercices" onClickFunction={fetchOneExercice} options={stretches} placeholder="Choisissez vos étirements" />
                                    )
                 
                            }                        
                            <div className="button-rest-container">
                                <button type="button" className="button-rest" onClick={addRest}>
                                    <img src={require("/assets/images/icons/rest1.svg")} />
                                    Ajouter une pause    
                                </button>
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
                        </div>
                    : ''
                }
            </form>
        </div>
    );
}
 
export default WorkoutForm;