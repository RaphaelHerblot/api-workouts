import React, { useEffect, useState } from 'react';
import WorkoutsAPI from "../../../../services/workoutsAPI";

const WorkoutShow = () => {
    const [workout, setWorkout] = useState([]);

    // Get the workout by id
    const fetchWorkout = async (idWorkout) => {
        try {
            const data = await WorkoutsAPI.findOne(idWorkout);
            setWorkout(data);
        } catch(error) {
            console.log(error.response)
        }
    }

    // Getting the workout when component first generate
    useEffect(() => {
        fetchWorkout();
    }, [])

    return (
        <div>
            <WorkoutCard workout={workout} />
            <WorkfoutForm workout={workout} />
        </div>
    );
}

export default WorkoutShow;