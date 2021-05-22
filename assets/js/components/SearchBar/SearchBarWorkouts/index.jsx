import React, { useState, useEffect } from 'react';

import '../style.scss';

const SearchBarWorkouts = ({ workouts, search, setSearch, setCurrentPage, placeholder }) => {
    const [showProposedWorkouts, setShowProposedWorkouts] = useState(false);
    const [searchBarValue, setSearchBarValue] = useState("");
    const [proposedWorkouts, setProposedWorkouts] = useState([]);

    useEffect(() => {
        setProposedWorkouts(
          workouts.filter((workout) => workout.title.toLowerCase().includes(search.toLowerCase()) || workout.description.toLowerCase().includes(search.toLowerCase()))
        );

        if (proposedWorkouts.length !== 0) {
            setShowProposedWorkouts(true);
        }
        
    }, [searchBarValue]);

    const handleFocus = () => {
        if(showProposedWorkouts === false) {
            setShowProposedWorkouts(true);
        }
    }

    const handleBlur = () => {
        if(showProposedWorkouts === true) {
            setShowProposedWorkouts(false);
        }
    }
    
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setSearchBarValue(currentTarget.value)
        setCurrentPage(1);
    }

    const onClickFunction = () => {

    }

    return ( 
        <div 
            className="search-bar search-bar-workouts" 
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
                onChange={handleSearch}
                onFocus={handleFocus}
                />
            </div>
            {showProposedWorkouts ? (
                <ul className="search-bar-results">
                    {proposedWorkouts.map((workout, index) => {
                        if(index < 10) {
                            return (
                                <li
                                    key={workout.id}
                                    className={"workout_" + workout.id}
                                    onMouseDown={() => setSearch(workout.title)}
                                    value={workout.id}
                                >
                                    <span>{workout.title}</span> 
                                </li>
                            );
                        }
                    })}
                </ul>
            ) : null}
        </div>
    );
}
 
export default SearchBarWorkouts;