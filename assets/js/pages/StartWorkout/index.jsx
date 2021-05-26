import React, { useState, useEffect } from 'react';
import WorkoutsAPI from "../../services/workoutsAPI";
import CounterStarting from '../../components/CounterStarting';
import WorkingOut from '../../components/Workouts/WorkingOut';
import './style.scss';

const StartWorkout = ({ match, setPageTitle }) => {
    const [workout, setWorkout] = useState([]);
    const [workoutLoaded, setWorkoutLoaded] = useState(false);
    const [isStarting, setIsStarting] = useState(false);
    const [startingNumber, setStartingNumber] = useState(5);

    // Get the workout by id
    const fetchWorkout = async (idWorkout) => {
        try {
            const data = await WorkoutsAPI.findOne(idWorkout);
            setWorkout(data.data);
            setWorkoutLoaded(true);
        } catch(error) {
            console.log("Error : ", error.response)
        }
    }

    // Get the workout by id when the component if first rendering
    useEffect(() => {
        setPageTitle("Faites votre séance")
        fetchWorkout(match.params.id);
    }, [])

    // Setting a timer for the countdown
    useEffect(() => {
        if(startingNumber > 0) {
            const newNumber = startingNumber-1;
            setTimeout(() => {
                setStartingNumber(newNumber)
            }, 1000);
        } else {
            setIsStarting(true)
        }
    }, [startingNumber])

    return ( 
        <div className={isStarting ? "working-out-container active" : "working-out-container" }>
            {!isStarting 
                ? <CounterStarting startingNumber={startingNumber} workoutTitle={workout.title} /> 
                : workoutLoaded ? <WorkingOut workout={workout} /> : ''
            }
        </div>
    );
}
 
export default StartWorkout;