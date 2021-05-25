import React, { useState, useEffect } from 'react';
import ExerciseCard from '../../Exercises/ExerciseCard';
import CurrentExercise from '../../Exercises/CurrentExercise';
import './style.scss';
import ProgressionBar from '../../ProgressionBar';
import WorkoutFinished from '../WorkoutFinished';

const WorkingOut = ({ workout }) => {
    const [step, setStep] = useState(0);
    const [serie, setSerie] = useState(1);
    const [nextIndex, setNextIndex] = useState(step+1);
    const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [progression, setProgression] = useState(0);
    const [percentProgression, setPercentProgression] = useState(0);
    const [percentTime, setPercentTime] = useState(( 100 / workout.nbRepetition[step].repetition ));
    const [isLastStep, setIsLastStep] = useState(false);
    const numberOfSteps = workout.exercices.length
    const numberOfSeries = workout.series;
    const numberTotalOfExercises = numberOfSteps*numberOfSeries;
    let time = null;

    useEffect(() => {
        setCurrentTime(workout.nbRepetition[step].repetition);
    }, [step])


    useEffect(() => {
        if(workout.exercices[workout.nbRepetition[step].index].type !== "Musculation") {
            if(currentTime > 0) {
                const newCurrentTime = currentTime-1;
                time = setTimeout(() => {
                    console.log(parseInt(( 100 / workout.nbRepetition[step].repetition )))
                    setPercentTime(percentTime + ( 100 / workout.nbRepetition[step].repetition ))
                    setCurrentTime(newCurrentTime)
                }, 1000);
            } else {
                handleNextStep();
            }
        }
    }, [currentTime])

    useEffect(() => {
        setPercentProgression(parseInt((progression / numberTotalOfExercises) * 100));
    }, [progression])

    const handleNextStep = () => {
        const nextStep = step+1;
        const nextSerie = serie+1;
        setProgression(progression+1);
        clearTimeout(time);
        setPercentTime(0);

        if(step < numberOfSteps-1) {
            setStep(nextStep)

            if(step < numberOfSteps-2) {
                setNextIndex(nextStep+1)
            } else {
                setNextIndex(0);
            }
        } else {
            setStep(0);
            setNextIndex(1);

            if(serie < numberOfSeries) {
                setSerie(nextSerie);
            } else {
                setIsWorkoutFinished(true);
            }
        }
    }

    return ( 
        <div className="working-out">
            {!isWorkoutFinished 
                ? 
                <div>
                    <CurrentExercise handleNextStep={handleNextStep} exercise={workout.exercices[workout.nbRepetition[step].index]} currentTime={currentTime} percentTime={percentTime} />
                    <div className="next-exercise">
                        <p className="next-text">Suivant</p>
                        <ExerciseCard exercice={workout.exercices[workout.nbRepetition[nextIndex].index]} nbRepetition={workout.nbRepetition[nextIndex].repetition} />
                        <ProgressionBar percentProgression={percentProgression} numberTotalOfExercises={numberTotalOfExercises} progression={progression} />
                    </div>
                </div>
                : <WorkoutFinished />
            }
          
        </div>
    );
}
 
export default WorkingOut;