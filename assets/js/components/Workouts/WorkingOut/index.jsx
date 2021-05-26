import React, { useState, useEffect } from 'react';
import ExerciseCard from '../../Exercises/ExerciseCard';
import CurrentExercise from '../../Exercises/CurrentExercise';
import './style.scss';
import ProgressionBar from '../../ProgressionBar';
import WorkoutFinished from '../WorkoutFinished';

const WorkingOut = ({ workout }) => {
    const [step, setStep] = useState(0);
    const [serie, setSerie] = useState(1);
    const [nextIndex, setNextIndex] = useState(step);
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
        if(isFirstStep) {
            if(numberOfSteps !== 1) {
                setNextIndex(step+1);
            }
        }
    }, [nextIndex])
    // Setting the currentTime / currentRepetition whenever a new step begin
    useEffect(() => {
        setCurrentTime([]);
        setCurrentTime(workout.nbRepetition[step].repetition);
    }, [step])

    // Handling the currentTime / currentRepetition
    useEffect(() => {
        // If it's the first step, we don't execute the algorithm
        if(isFirstStep) {
            setIsFirstStep(false);
        } 
        // If it's a stretch of a rest, a timer is set until it's done and go to the next step
        else {
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

    // Updating the percent progression whenever there is a progression
    useEffect(() => {
        setPercentProgression(parseInt((progression / numberTotalOfExercises) * 100));
    }, [progression])

    // Function that handle the next step
    const handleNextStep = () => {
        const nextStep = step+1;
        const nextSerie = serie+1;
        setProgression(progression+1);
        clearTimeout(time);
        setPercentTime(0);

        /* If the number of steps is inferior of the total number of steps in one serie :
            The workout go the next step
        */
        if(step < numberOfSteps-1) {
            setStep(nextStep)

            if(step < numberOfSteps-2) {
                setNextIndex(nextStep+1)
            } else {
                setNextIndex(0);
            }

            // If we are at the before last step, isLastStep is set at true to handle correctly the preview of the next step
            if(serie === numberOfSeries && step === numberOfSteps-2) {
                setIsLastStep(true);
            }
        }
        // If the number of steps is equal of the total number of steps in one serie
        else {
            setStep(0);

            if(numberOfSteps !== 1) {
                setNextIndex(1);
            } else {
                setNextIndex(0);
            }

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