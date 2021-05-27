import React from 'react';

// Exercise selector

const SelectExercise = ({ name, options, onClickFunction, error = "", placeholder }) => {
    return (
        <div className="select-exercise">
            <select 
                id={name}
                name={name}
                onChange={onClickFunction}
                className={"form-control" + (error && " is-invalid")}
            >
                <option>{placeholder}</option>
                {options.map(option =>
                    <option key={option.id} value={option.id}>
                        {option.title}
                    </option>
                )}
            </select>
            <img src={require("/assets/images/icons/triangle.svg")} />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    )
};
 
export default SelectExercise;