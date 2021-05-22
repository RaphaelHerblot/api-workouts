import React from 'react';

const SelectExercise = ({ name, options, onClickFunction, error = "", placeholder }) => ( 
    <div className="form-group">
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
        {error && <p className="invalid-feedback">{error}</p>}
    </div>
);
 
export default SelectExercise;