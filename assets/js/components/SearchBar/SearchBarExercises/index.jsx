import React, { useState, useEffect} from 'react';
import '../style.scss';

const SearchBarExercises = ({ exercises, onClickFunction, placeholder, proposedExercises, setProposedExercises }) => {
    const [showProposedExercises, setShowProposedExercises] = useState(false);
    const [searchBarValue, setSearchBarValue] = useState("");
    
    // For each changes of the search bar value, the exercises result is changed 
    useEffect(() => {
        setProposedExercises(
          exercises.filter((exercise) => exercise.title.toLowerCase().includes(searchBarValue.toLowerCase()))
        );

        if (proposedExercises.length !== 0) {
            setShowProposedExercises(true);
        }
        
    }, [searchBarValue]);

    // Show list of exercise when user is on the search bar input
    const handleFocus = () => {
        if(showProposedExercises === false) {
            setShowProposedExercises(true);
        }
    }

    // Hide list of exercise when user is on the search bar input
    const handleBlur = () => {
        if(showProposedExercises === true) {
            setShowProposedExercises(false);
        }
    }

    return ( 
        <div 
            className="search-bar" 
            onBlur={handleBlur}
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