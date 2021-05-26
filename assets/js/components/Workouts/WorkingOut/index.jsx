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
    const [isFirstStep, setIsFirstStep] = useState(true);
    const [isLastStep, setIsLastStep] = useState(false);
    const numberOfSteps = workout.exercices.length
    const numberOfSeries = workout.series;
    const numberTotalOfExercises = numberOfSteps*numberOfSeries;
    let time = null;

    useEffect(() => {
        setCurrentTime(workout.nbRepetition[step].repetition);
    }, [step])


    useEffect(() => {
        console.log("CurrentTime : ", currentTime);
        console.log("Step : ", step)
        console.log("Type : ", workout.exercices[workout.nbRepetition[step].index].type);
        console.log("Workout : ", workout);
        console.log("Exercise : ", workout.exercices[workout.nbRepetition[step].index]);
        console.log("Index : ", workout.nbRepetition[step].index);

        if(isFirstStep) {
            setIsFirstStep(false)
        } else {
            if(workout.exercices[workout.nbRepetition[step].index].type !== "Musculation") {
                if(currentTime > 0) {
                    const newCurrentTime = currentTime-1;
                    time = setTimeout(() => {
                        setPercentTime(percentTime + ( 100 / workout.nbRepetition[step].repetition ))
                        setCurrentTime(newCurrentTime)
                    }, 1000);
                } else {
                    handleNextStep();
                }
            }
        }
    }, [currentTime])

    useEffect(() => {
        setPercentProgression(parseInt((progression / numberTotalOfExercises) * 100));
        console.log("Progression : ", progression);
        console.log("Percent progression : ", percentProgression);
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

            if(serie === numberOfSeries && step === numberOfSteps-2) {
                setIsLastStep(true);
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
                        <CurrentExercise 
                            handleNextStep={handleNextStep} 
                            exercise={workout.exercices[workout.nbRepetition[step].index]} 
                            currentTime={currentTime} percentTime={percentTime} 
                            firstTime={100 / workout.nbRepetition[step].repetition} 
                        />
                        <div className="next-exercise">
                            <p className="next-text">Suivant</p>
                            {!isLastStep 
                            ? <ExerciseCard exercice={workout.exercices[workout.nbRepetition[nextIndex].index]} nbRepetition={workout.nbRepetition[nextIndex].repetition} />
                            : <div className="workout-finishing">La séance est terminée, bravo !</div>
                            }
                            <ProgressionBar percentProgression={percentProgression} numberTotalOfExercises={numberTotalOfExercises} progression={progression} />
                        </div>
                    </div>
                : <WorkoutFinished workoutTitle={workout.title} />
            }
          
        </div>
    );
}
 
export default WorkingOut;