import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { useHistory } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
    const [newExerciseContent, setNewExerciseContent] = useState("");
    const [listExercises, setListExercises] = useState([])
    const [count, setCount] = useState(0);
    const [isResting, setIsResting] = useState(false);
    let history = useHistory();

    useEffect(() => {
        fetchWorkoutsData();
        console.log("WorkoutData : ", workoutData);
        console.log("History : ", history)
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
            const tempExercises = [];

            for (var i = 0; i < existingWorkout.nbRepetition.length ; i++) {
                tempExercises.push(existingWorkout.exercices[existingWorkout.nbRepetition[i].index]);
                if(tempExercises[i].type === "Rest") {
                    setIsResting(true);
                }
            }

            for (var i = 0; i < existingWorkout.exercices ; i++) {
            }
    
            // const tempExercises = [...existingWorkout.exercices];
            console.log("Temp Exo : ", tempExercises);
            setListExercises(tempExercises);
        }
    }, [])

    useEffect(() => {
        console.log("Workout : ", workout);
    }, [workout])

    useEffect(() => {
        console.log("EXOOOOOOOOO : ", exercices);
        console.log("Workout goal : ", workout.goal);
        console.log("Workout goal id : ", goals);
    }, [exercices])

    useEffect(() => {
        console.log("BJR SANA : ", chosenExercise);
        if(chosenExercise) {
            addExerciceToWorkout3();
        }
    }, [chosenExercise]);

    useEffect(() => {
       console.log("Count : ", count);
       
    }, [count]);

    useEffect(() => {
        console.log("List Exercises : ", listExercises);
        
     }, [listExercises]);

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
    
    const deleteExercise = (event, index) => {
        console.log("Target : ", event.target);
        console.log("Index : ", index);
        console.log(exercices)
        const newExercisesList = [...listExercises];
        
        newExercisesList.splice(index, 1);
        setListExercises(newExercisesList);
        (event.target.parentElement.parentElement.parentElement).remove();
    }

    const deleteRest = (event, index) => {
        const newExercisesList = [...listExercises]; 
        newExercisesList.splice(index, 1);
        setListExercises(newExercisesList);
        (event.target.parentElement.parentElement.parentElement).remove();
        setIsResting(false);
    }

    const addRest = () => {
        setChosenExercise(rest);
        console.log("RESSSSSSSST : ", rest);
        setIsResting(true);
    }

    const addExerciceToWorkout3 = () => {
        console.log("Exercice choisi : ", chosenExercise);
        if(chosenExercise && Object.keys(chosenExercise).length > 0 && chosenExercise.constructor === Object) {
            const tempListExercises = [...listExercises];
            tempListExercises.push(
                chosenExercise
            );
            setCount(count+1);
            setListExercises(tempListExercises)
            setChosenExercise([]);
        }
    }

    const compareValue = ( a, b ) => {
        if ( a.value < b.value ){
          return -1;
        }
        if ( a.value > b.value ){
          return 1;
        }
        return 0;
    }

    const compareOrder = ( a, b ) => {
        if ( a.order < b.order ){
          return -1;
        }
        if ( a.order > b.order ){
          return 1;
        }
        return 0;
    }
      

    const handleSubmit = async event => {
        event.preventDefault();

        var listExercices = document.querySelectorAll('input[type=hidden]');
        var listRepetitions = document.querySelectorAll('.exercise-number');
        var orderExercises = [];
        var indexingOrder = [];
        workout.exercices = [];
        workout.nbRepetition = [];

        for (var i = 0; i < listExercices.length ; i++) {
            orderExercises.push({value: listExercices[i].value, repetition: listRepetitions[i].value, order: i});
        }

        orderExercises.sort(compareValue);
        for (var i = 0; i < listExercices.length ; i++) {
            indexingOrder.push({value: orderExercises[i].value, repetition: orderExercises[i].repetition, order: orderExercises[i].order, index: i});
        }

        indexingOrder.sort(compareOrder);

        for (var i = 0; i < listExercices.length; i++) {
            console.log("ListExercices : ", listExercices[i].value);
            workout.exercices.push(listExercices[i].value);
            workout.nbRepetition.push({
                repetition: indexingOrder[i].repetition,
                order: indexingOrder[i].order,
                index: indexingOrder[i].index
            });
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
                history.push(`/workout/${workoutData.id}`);
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

    const handleOnDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        console.log("Result : ", result.destination.index);
        console.log("Result : ", result.destination.index);
        // console.log("List exo : ", listExercises);
        const items = Array.from(listExercises);
        // console.log("Item list : ", items)
        const [reorderedItem] = items.splice(result.source.index, 1);
        // console.log("ReorderedItem : ", [reorderedItem])
        items.splice(result.destination.index, 0, reorderedItem);
        // console.log("Item splice : ", items);

        setListExercises(items);
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
                                {isResting 
                                    ? ""
                                    : 
                                    <button type="button" className="button-rest" onClick={addRest}>
                                        <img src={require("/assets/images/icons/rest1.svg")} />
                                        Ajouter une pause    
                                    </button>
                                }
                            </div>
                
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Droppable droppableId="listExercices">
                                    {(provided) => (
                                        <div className="listExercices" {...provided.droppableProps} ref={provided.innerRef}>
                                            {workoutIsUpdated 
                                                ? 
                                                listExercises.map((exercise, index) =>  
                                                    <Draggable key={exercise.id + "_" + count + "_" + index} draggableId={exercise.id + "_" + count + "_" + index} index={index}>
                                                        {(provided) => (
                                                            <div 
                                                                id={"content_" + exercise.id} 
                                                                className="exercise-container"
                                                                ref={provided.innerRef} 
                                                                {...provided.draggableProps} 
                                                                {...provided.dragHandleProps}
                                                            >
                                                                {exercise.type === "Rest" 
                                                                    ? <RestTime chosenRest={exercise} nbRepetition={workout.nbRepetition[index] ? workout.nbRepetition[index].repetition : null } onChange={handleChange} deleteExercise={deleteRest} index={index} />                                
                                                                    : <ExerciseForm chosenExercise={exercise} nbRepetition={workout.nbRepetition[index] ? workout.nbRepetition[index].repetition : null } onChange={handleChange} deleteExercise={deleteExercise} index={index} />                                
                                                                }
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                                : 
                                                listExercises.map((exercise, index) =>  
                                                    <Draggable key={exercise.id + "_" + count + "_" + index} draggableId={exercise.id + "_" + count + "_" + index} index={index}>
                                                        {(provided) => (
                                                            <div 
                                                                id={"content_" + exercise.id} 
                                                                className="exercise-container"
                                                                ref={provided.innerRef} 
                                                                {...provided.draggableProps} 
                                                                {...provided.dragHandleProps}
                                                            >
                                                                {exercise.type === "Rest" 
                                                                    ? <RestTime chosenRest={exercise} nbRepetition={workout.nbRepetition[index]} onChange={handleChange} deleteExercise={deleteRest} index={index} />                                
                                                                    : <ExerciseForm chosenExercise={exercise} nbRepetition={workout.nbRepetition[index]} onChange={handleChange} deleteExercise={deleteExercise} index={index} />                                
                                                                }
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            }
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext> 
                        
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