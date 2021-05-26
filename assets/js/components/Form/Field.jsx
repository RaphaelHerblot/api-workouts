import React from 'react';

const Field = ({ name, label, value, onChange, placeholder = "", type = "text", error = "", min, max}) => ( 
    <div className="form-group">
        {error && <p className="invalid-feedback">{error}</p>}
        <input 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            type={type}
            id={name}
            name={name}
            className={"form-control" + (error && " is-invalid")}
            min={min}
            max={max}
            required
        />
        <label htmlFor={name}>{label}</label>

        <div className="border-field"></div>
    </div>
);
 
export default Field;