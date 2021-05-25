import React, { useState, useEffect, useRef } from 'react';

import '../style.scss';

const SearchBarExercises = ({ exercises, onClickFunction, placeholder }) => {
    const [showProposedExercises, setShowProposedExercises] = useState(false);
    const [searchBarValue, setSearchBarValue] = useState("");
    const [proposedExercises, setProposedExercises] = useState([]);

    useEffect(() => {
        setProposedExercises(
          exercises.filter((exercise) => exercise.title.toLowerCase().includes(searchBarValue.toLowerCase()))
        );

        if (proposedExercises.length !== 0) {
            setShowProposedExercises(true);
        }
        
    }, [searchBarValue]);

    const handleFocus = () => {
        if(showProposedExercises === false) {
            setShowProposedExercises(true);
        }
    }

    // const handleBlur = () => {
    //     if(showProposedExercises === true) {
    //         setShowProposedExercises(false);
    //     }
    // }

    useEffect(() => {
        console.log("YOOOOOOO : ", proposedExercises);
    }, [proposedExercises])

    return ( 
        <div 
            className="search-bar" 
        >
            <div className="search-box">
                <button className="search-btn">
                    <img src={require("/assets/images/icons/loup-orange-small.svg")} />
                </button>
                <input
                className="search-input"
                type="text"
                placeholder={placeholder}
                value={searchBarValue}
                onChange={(e) => setSearchBarValue(e.target.value)}
                onFocus={handleFocus}
                />
            </div>
            {showProposedExercises ? (
                <ul className="search-bar-results">
                    {proposedExercises.map((exercise) => {
                        return (
                        <li
                            key={exercise.id}
                            className={"exercise_" + exercise.id}
                            onMouseDown={onClickFunction}
                            value={exercise.id}
                        >
                            <span><img src={require("/assets/images/exercices/"+exercise.id+".svg")} /></span>
                            <span>{exercise.title}</span> 
                        </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
}
 
export default SearchBarExercises;